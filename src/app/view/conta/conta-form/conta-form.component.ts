import {Component, Input, OnInit} from '@angular/core';
import {Util} from "../../../util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Conta} from "../../../model/conta";
import {DefaultService} from "../../../service/default.service";
import {MessageService} from "primeng/api";
import {Fornecedor} from "../../../model/fornecedor";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {TipoConta} from "../../../model/tipo-conta";
import {LancamentoContaCartao} from "../../../model/lancamento-conta-cartao";
import {Despesa} from "../../../model/despesa";

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css'],
  providers: [MessageService]
})
export class ContaFormComponent implements OnInit{
  @Input() tiposConta:TipoConta[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  @Input() loading?:boolean;

  fornecedores:Fornecedor[]= [];
  util: Util = new Util();
  contaCadastro:Conta=new Conta();
  contaform!: FormGroup;
  lancamentoContaCartao:LancamentoContaCartao= new LancamentoContaCartao();

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.contaform = this.fb.group({
      inputCodigoBarras: new FormControl('', Validators.required),
      inputNumero : new FormControl('', Validators.required),
      comboTipoConta: new FormControl(),
      comboFormaPagamento: new FormControl(),
      inputEmissao: new FormControl('', Validators.required),
      inputVencimento: new FormControl('', Validators.required),
      inputParcela: new FormControl(),
      inputTotalParcela: new FormControl(),
      inputValor: new FormControl('', Validators.required),
      inputValorPgto: new FormControl(),
      inputDataPgto: new FormControl()
    });

    this.contaCadastro.parcela=0;
    this.contaCadastro.totalParcela=0;

    this.lancamentoContaCartao.parcela=0;
    this.lancamentoContaCartao.totalParcela=0;

    this.contaCadastro.lancamentoContaCartao=[];
  }

  onSubmit(value:string) {
    this.loading = true;
    this.contaCadastro.codigoBarra = this.contaform.controls['inputCodigoBarras'].value.replace(/[^0-9]+/g, '');
    this.contaCadastro.numero = this.contaform.controls['inputNumero'].value;

    if(!this.contaCadastro.tipoConta)
      this.contaCadastro.tipoConta = this.tiposConta[0];

    this.contaCadastro.emissao = this.util.dataBRtoDataIso(this.contaform.controls['inputEmissao'].value);
    this.contaCadastro.vencimento = this.util.dataBRtoDataIso(this.contaform.controls['inputVencimento'].value);
    if(this.contaform.controls['inputParcela'].value)
      this.contaCadastro.parcela = parseInt(this.contaform.controls['inputParcela'].value);
    if(this.contaform.controls['inputTotalParcela'].value)
      this.contaCadastro.totalParcela = parseInt(this.contaform.controls['inputTotalParcela'].value);

    this.contaCadastro.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(this.contaform.controls['inputValor'].value)
    );

    if(this.contaform.controls['inputDataPgto'].value && this.contaform.controls['inputDataPgto'].value){
      if(!this.contaCadastro.formaPagamento)
        this.contaCadastro.formaPagamento = this.formasPagamento[0];
        this.contaCadastro.dataPagamento = this.util.dataBRtoDataIso(this.contaform.controls['inputDataPgto'].value);
        this.contaCadastro.valorPago = this.util.formatMoedaToFloat(
          this.util.formatFloatToReal(this.contaform.controls['inputValorPgto'].value)
        );
    }else{
      this.contaCadastro.formaPagamento = undefined;
      this.contaCadastro.dataPagamento = undefined;
      this.contaCadastro.valorPago = undefined;
    }

    this.defaultService.save(this.contaCadastro, 'conta').
    subscribe({
      next: resultado =>{
        this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Conta salva com sucesso'});
      },
      error: error =>{
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
      },
      complete: () => {
        this.contaCadastro = new Conta();
        this.contaCadastro.lancamentoContaCartao = [];
        this.contaform.reset();
        this.loading = false;
      }
    })
  }

  addLcc(event:any){
    let cloneLcc :LancamentoContaCartao = Object.assign({}, this.lancamentoContaCartao)

    cloneLcc.data = this.util.dataBRtoDataIso(cloneLcc.data);
    cloneLcc.valor = this.util.formatMoedaToFloat(
      this.util.formatFloatToReal(cloneLcc.valor.toString())
    );

    if(!cloneLcc.parcela)
      cloneLcc.parcela=0;
    if(!cloneLcc.totalParcela)
      cloneLcc.totalParcela=0;

    this.contaCadastro.lancamentoContaCartao.push(cloneLcc);

    this.lancamentoContaCartao = new LancamentoContaCartao();
  }

  filterFornecedor(event: any) {
    let query = event.query;
    this.defaultService.get('fornecedor/search/'+event.query)
      .subscribe(resultado => {
        this.fornecedores = resultado;
      });
  }

  maskaraMoeda($event: KeyboardEvent) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
  }
}
