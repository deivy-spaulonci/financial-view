import {Component, OnInit, ViewChild} from '@angular/core';
import {FormaPagamento} from "../../model/forma-pagamento";
import {TipoConta} from "../../model/tipo-conta";
import {DefaultService} from "../../service/default.service";
import {ContaFormComponent} from "./conta-form/conta-form.component";
import {ContaListComponent} from "./conta-list/conta-list.component";

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit{
  tiposConta:TipoConta[] = [];
  formasPagamento:FormaPagamento[]=[];
  @ViewChild('formConta') form?:ContaFormComponent;
  @ViewChild('listConta') list?:ContaListComponent;

  loading:boolean = false;
  activeIndex: number = 0;

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

  refresTable(){
    this.activeIndex=0;
    this.list?.dt?._filter();
  }

  editarConta($event: Number) {
    this.activeIndex=1;
    this.form?.editarConta($event);
  }
}
