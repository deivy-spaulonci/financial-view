import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DefaultService} from "../../service/default.service";
import {TipoDespesa} from "../../model/tipo-despesa";
import {FormaPagamento} from "../../model/forma-pagamento";
import {Fornecedor} from "../../model/fornecedor";
import {DespesaListComponent} from "./despesa-list/despesa-list.component";

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit{
  tiposDespesa:TipoDespesa[] = [];
  formasPagamento:FormaPagamento[]=[];
  fornecedores:Fornecedor[]=[];
  loading:boolean = false;
  @ViewChild('listDespesa') child?:DespesaListComponent;

  constructor(private defaultService: DefaultService) {
  }

  loadTable(event:any){
    this.child?.refresTable();
  }

  ngOnInit(): void {
    this.loading = true;
    this.defaultService.get('tipo-despesa').subscribe(tipos => {
      this.tiposDespesa = tipos;
      this.defaultService.get('fornecedor').subscribe(fornecedores => {
        this.fornecedores = fornecedores;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
          this.loading = false;
        });
      });
    });
  }
}
