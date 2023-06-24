import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormaPagamento} from "../../../model/forma-pagamento";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {TipoConta} from "../../../model/tipo-conta";
import {DefaultService} from "../../../service/default.service";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Util} from "../../../util/util";
import {Conta} from "../../../model/conta";

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaListComponent implements OnInit{
  @Input() tiposConta:TipoConta[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  @Output() editConta: EventEmitter<Number> = new EventEmitter();
  @ViewChild('dt') dt?:Table;

  contas:Conta[] = [];
  contaSelecionada!:Conta;
  cols!: any[];
  loading:boolean=false;
  totalValor!: number;
  items!: MenuItem[];
  // tabela
  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;
  util: Util = new Util();

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'tipoConta', header: 'Conta', width: 'auto'},
      {field: 'emissao', header: 'Emissao', width: '150px'},
      {field: 'vencimento', header: 'Vencimento', width: '150px'},
      {field: 'parcela', header: 'Parcelas', width: '100px'},
      {field: 'valor', header: 'Valor', width: '150px'},
      {field: 'status', header: 'Status', width: '110px'}
    ];
    this.items = [
      {label: 'Excluir', icon: 'pi pi-fw pi-times',
        command: () => this.excluirConta() },
      {label: 'Editar', icon: 'pi pi-fw pi-pencil',
        command: () => this.editar() }
    ];
  }

  editar(){
    this.editConta.emit(this.contaSelecionada.id);
  }

  loadData(event: TableLazyLoadEvent) {

    let urlfiltros: string = '';
    this.loading = true;

    if (event.filters) {
      let filtros: any = event.filters;

      if (filtros.id && filtros.id[0].value) {
        urlfiltros += '&id=' + filtros.id[0].value;
      }
      if (filtros.tipoConta && filtros.tipoConta[0].value) {
        urlfiltros += '&tipoConta.id=' + filtros.tipoConta[0].value.id;
      }
      if (filtros.vencimentoInicial && filtros.vencimentoInicial.value) {
        urlfiltros += '&vencimentoInicial=' + filtros.vencimentoInicial.value.split("T")[0];
      }
      if (filtros.vencimentoFinal && filtros.vencimentoFinal.value) {
        urlfiltros += '&vencimentoFinal=' + filtros.vencimentoFinal.value.split("T")[0];
      }
      if (filtros.vencimento && filtros.vencimento[0].value) {
        urlfiltros += '&vencimento=' + filtros.vencimento[0].value.split("T")[0];
      }
      if (filtros.emissao && filtros.emissao[0].value) {
        urlfiltros += '&emissao=' + filtros.emissao[0].value.split("T")[0];
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'vencimento');

    const url: string = 'conta/page?page=' + ((event.first && event.rows) ? (event.first / event.rows) : 0)
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.contas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('conta/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal ? somatotal : 0;
      });
    });
  }
  excluirConta(){
    this.loading=true;
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir essa conta?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.defaultService.delete(this.contaSelecionada.id, 'conta')
          .subscribe({
            next: res => {
              this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Conta excluída'});
              this.dt?._filter();
              this.loading=false;

            },
            error: error =>{
              this.loading = false;
              this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
            },
          })
      }
    });
  }

}
