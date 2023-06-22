import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TipoDespesa} from "../../../model/tipo-despesa";
import {Fornecedor} from "../../../model/fornecedor";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {DefaultService} from "../../../service/default.service";
import {Util} from "../../../util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Despesa} from "../../../model/despesa";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.css'],
  providers: [MessageService]
})
export class DespesaFormComponent implements OnInit{
  @Input() tiposDespesa:TipoDespesa[]= [];
  @Input() fornecedores:Fornecedor[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  @Input() loading?:boolean;
  @Output() refreshTable: EventEmitter<void> = new EventEmitter();

  util: Util = new Util();
  despesaCadastro:Despesa=new Despesa();
  despesaform!: FormGroup;

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.despesaform = this.fb.group({
      comboTipoDespesa: new FormControl(),
      autoCompleteFornecedor : new FormControl('', Validators.required),
      comboFormaPagamento: new FormControl(),
      inputObservacao: new FormControl(),
      inputData: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.required),
      inputValorPgto: new FormControl()
    });
    this.despesaCadastro.tipoDespesa = this.despesaform.controls['comboTipoDespesa'].value;
    this.despesaCadastro.formaPagamento = this.despesaform.controls['comboFormaPagamento'].value;
  }

  filterFornecedor(event: any) {
    let query = event.query;
    this.defaultService.get('fornecedor/search/'+event.query)
      .subscribe(resultado => {
        this.fornecedores = resultado;
    });
  }

  onSubmit(value: string) {
    this.loading = true;
    this.despesaCadastro.fornecedor = this.despesaform.controls['autoCompleteFornecedor'].value;

    if(!this.despesaCadastro.tipoDespesa)
      this.despesaCadastro.tipoDespesa = this.tiposDespesa[0];
    if(!this.despesaCadastro.formaPagamento)
      this.despesaCadastro.formaPagamento = this.formasPagamento[0];

    this.despesaCadastro.data = this.util.dataBRtoDataIso(this.despesaform.controls['inputData'].value);
    this.despesaCadastro.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(this.despesaform.controls['inputValor'].value)
    );

    this.defaultService.save(this.despesaCadastro, 'despesa').
    subscribe({
      next: resultado =>{
        this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
      },
      error: error =>{
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
      },
      complete: () => {
        this.despesaCadastro = new Despesa();
        this.despesaCadastro.fornecedor = new Fornecedor();
        this.despesaform.reset();
        this.refreshTable.emit();
        this.loading = false;
      }
    })
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }
}
