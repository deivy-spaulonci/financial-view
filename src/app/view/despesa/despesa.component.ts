import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../service/default.service";
import {TipoDespesa} from "../../model/tipo-despesa";
import {FormaPagamento} from "../../model/forma-pagamento";
import {Fornecedor} from "../../model/fornecedor";

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

  constructor(private defaultService: DefaultService) {
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
