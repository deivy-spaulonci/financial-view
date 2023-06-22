import {Component, OnInit} from '@angular/core';
import {FormaPagamento} from "../../model/forma-pagamento";
import {TipoConta} from "../../model/tipo-conta";
import {DefaultService} from "../../service/default.service";

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit{
  tiposConta:TipoConta[] = [];
  formasPagamento:FormaPagamento[]=[];

  loading:boolean = false;

  constructor(private defaultService: DefaultService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.defaultService.get('tipo-conta').subscribe(tipos => {
      this.tiposConta = tipos;
        this.defaultService.get('forma-pagamento').subscribe(formas => {
          this.formasPagamento = formas;
          this.loading = false;
        });
    });
  }

  editarConta($event: Number) {
   alert($event)
  }
}
