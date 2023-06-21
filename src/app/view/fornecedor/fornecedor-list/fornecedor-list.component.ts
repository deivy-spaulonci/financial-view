import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../../service/default.service";
import {Fornecedor} from "../../../model/fornecedor";
import {TableLazyLoadEvent} from "primeng/table";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class FornecedorListComponent implements OnInit{

  fornecedorSelecionado!: Fornecedor;
  cols!: any[];
  fornecedores!: any[];
  cidadesFiltro!: any[];
  loading:boolean=false;
  // tabela
  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }
  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID', width: '90px'},
      {field: 'nome', header: 'Nome', width: 'auto'},
      {field: 'cnpj', header: 'CNPJ', width: '170px'},
      {field: 'cidade', header: 'Cidade', width: '200px'},
    ];

    this.defaultService.get("fornecedor/cidadesFornecedor").subscribe(resultado => {
        this.cidadesFiltro = resultado;
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
      if (filtros.nome && filtros.nome[0].value) {
        urlfiltros += '&nome=' + filtros.nome[0].value;
      }
      if (filtros.cnpj && filtros.cnpj[0].value) {
        urlfiltros += '&cnpj=' + filtros.cnpj[0].value;
      }
      if (filtros.cidade && filtros.cidade[0].value) {
        urlfiltros += '&cidade.id=' + filtros.cidade[0].value.id;
      }
    }

    event.rows = (event.rows ? event.rows : this.pageSize);
    event.sortField = (event.sortField ? event.sortField : 'nome');
    if(event.first)
      this.pageNumber = (event.first + event.rows) / event.rows - 1;
    this.loading = true;


    const url: string = 'fornecedor/page?page=' + this.pageNumber
      + '&size=' + event.rows
      + '&sort=' + event.sortField + ',' + (event.sortOrder == 1 ? 'asc' : 'desc')
     + urlfiltros;

    console.log(url);

    this.defaultService.get(url).subscribe(resultado => {
      this.fornecedores = resultado.content;
      this.totalElements = resultado.totalElements;

      this.loading = false;
      // this.messageService.add({severity: 'info', summary: 'Success', detail: 'Fornecedoes carregados'});
    });
  }
}
