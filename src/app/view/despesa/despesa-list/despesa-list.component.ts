import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {DefaultService} from "../../../service/default.service";
import {Despesa} from "../../../model/despesa";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {Table, TableLazyLoadEvent} from "primeng/table";
import {TipoDespesa} from "../../../model/tipo-despesa";
import {Fornecedor} from "../../../model/fornecedor";
import {FormaPagamento} from "../../../model/forma-pagamento";
import {Util} from "../../../util/util";

@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class DespesaListComponent implements OnInit {
  @Input() tiposDespesa:TipoDespesa[]= [];
  @Input() fornecedores:Fornecedor[]= [];
  @Input() formasPagamento:FormaPagamento[]= [];
  @ViewChild('dt') table?:Table;

  despesas:Despesa[] = [];
  despesaSelecionada!:Despesa;
  cols!: any[];
  loading:boolean=false;
  totalValor!: number;
  items!: MenuItem[];
  // tabela
  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;
  sortField:string='data'
  util: Util = new Util();
  filtroDespesaVisible: boolean=false;
  filtro:any={};

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'tipoDespesa', header: 'Despesa', width: '170px'},
      {field: 'fornecedor', header: 'Fornecedor', width: 'auto'},
      {field: 'data', header: 'Data', width: '100px'},
      {field: 'formaPagamento', header: 'Forma Pagamento', width: '230px'},
      {field: 'valor', header: 'Valor', width: '120px'}
    ];
    this.items = [
      {label: 'Excluir', icon: 'pi pi-fw pi-times',
        command: () => this.excluirDespesa() },
      // {label: 'Editar', icon: 'pi pi-fw pi-pencil',
      //   command: () => this.editarDespesa() }
    ];
  }

  refresTable(){
    this.table?._filter();
  }

  filterFornecedor(event: any) {
    let query = event.query;
    this.defaultService.get('fornecedor/search/'+event.query)
      .subscribe(resultado => {
        this.fornecedores = resultado;
      });
  }

  loadData(event: TableLazyLoadEvent) {
    let urlfiltros: string = '';
    this.loading = true;

    if (event.filters) {
      let filtros: any = event.filters;

      if (filtros.id && filtros.id[0].value) {
        urlfiltros += '&id=' + filtros.id[0].value;
      }
      if (filtros.tipoDespesa && filtros.tipoDespesa[0].value) {
        urlfiltros += '&tipoDespesa=' + filtros.tipoDespesa[0].value;
      }
      if (filtros.fornecedor && filtros.fornecedor[0].value) {
        urlfiltros += '&fornecedor.id=' + filtros.fornecedor[0].value.id;
      }
      if (filtros.data && filtros.data[0].value) {
        urlfiltros += '&data=' + filtros.data[0].value.split("T")[0];
      }
      if (filtros.inicio && filtros.inicio.value) {
        urlfiltros += '&dataInicial=' + filtros.inicio.value.split("T")[0];
      }
      if (filtros.fim && filtros.fim.value) {
        urlfiltros += '&dataFinal=' + filtros.fim.value.split("T")[0];
      }
      if (filtros.formaPagamento && filtros.formaPagamento[0].value) {
        urlfiltros += '&formaPagamento=' + filtros.formaPagamento[0].value;
      }
    }

    // alert(JSON.stringify(event.sortField))

    event.rows = (event.rows ? event.rows : this.pageSize);

    event.sortField = (event.sortField ? event.sortField : 'data');



    if (event.first)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    this.defaultService.get(url).subscribe(resultado => {
      this.despesas = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      this.defaultService.get('despesa/valorTotal?' + urlfiltros).subscribe(somatotal => {
        this.totalValor = somatotal;
      });
    });
  }

  excluirDespesa(){
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir essa despesa?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.defaultService.delete(this.despesaSelecionada, 'despesa')
          .subscribe(resultado =>{
            this.despesas = this.despesas.filter(val => val.id !== this.despesaSelecionada.id);
            this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Despesa excluída'});
          });
      }
    });
  }

  updateDespesa(despesa:Despesa){
    this.loading = true;
    this.defaultService.save(despesa, 'despesa').subscribe(resultado =>{
      this.loading = false;
      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Despesa salva com sucesso'});
    });
  }
  maskaraMoedaEditValor($event: KeyboardEvent, despesa:Despesa) {
    const element = ( $event.target as HTMLInputElement);
    element.value = this.util.formatFloatToReal(element.value);
    despesa.valor = this.util.formatMoedaToFloat(this.util.formatFloatToReal(element.value));
  }

  filtrarDespesa() {

    let urlfiltros: string = '';
    urlfiltros += this.filtro.id ? '&id=' + this.filtro.id : '';
    urlfiltros += this.filtro.tipoDespesa ? '&tipoDespesa=' + this.filtro.tipoDespesa.value : '';
    urlfiltros += this.filtro.fornecedor ? '&fornecedor.id=' + this.filtro.fornecedor.id : '';
    urlfiltros += this.filtro.inicio ? '&icinio=' + this.filtro.inicio : '';
    urlfiltros += this.filtro.fim ? '&fim=' + this.filtro.fim : '';
    urlfiltros += this.filtro.formaPagamento ? '&formaPagamento=' + this.filtro.formaPagamento.value : '';

    this.pageSize = (this.table?.rows ? this.table.rows : this.pageSize);
    this.sortField = (this.table?.sortField ? this.table.sortField : 'data');

    if (this.table?.first)
      this.pageNumber = (this.table?.first + this.pageSize) / this.pageSize - 1;

    const url: string = 'despesa/page?page=' + this.pageNumber
      + '&size=' + this.pageSize
      + '&sort=' + this.sortField + ',' + (this.table?.sortOrder == 1 ? 'asc' : 'desc')
      + urlfiltros;

    alert(url+urlfiltros)

  }
}

