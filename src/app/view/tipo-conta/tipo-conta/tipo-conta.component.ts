import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../../service/default.service";
import {TipoConta} from "../../../model/tipo-conta";
import {MessageService} from "primeng/api";
import {TipoContaStatus} from "../../../model/tipo-conta-status";

@Component({
  selector: 'app-tipo-conta',
  templateUrl: './tipo-conta.component.html',
  styleUrls: ['./tipo-conta.component.css'],
  providers: [MessageService]
})
export class TipoContaComponent implements OnInit{
  cols!: any[];
  tipos:TipoConta[]=[];
  tipoContaCadastro:TipoConta=new TipoConta();
  loading:boolean=false;

  constructor(private defaultService: DefaultService,
              private messageService: MessageService) {}

  ngOnInit() {
    this.cols = [
      {field: 'id', header: 'ID', width: '60px'},
      {field: 'nome', header: 'Nome', width: 'auto'},
      {field: 'contaCartao', header: 'Cartão', width: '40px'},
      {field: 'tipoContaCartaoStatus', header: 'Status', width: '90px'},
    ];
    this.buscaTiposConta();
  }

  cadastrar() {
    if(!this.tipoContaCadastro.nome ||
      this.tipoContaCadastro.nome.length<1){
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Nome inválido!'});
    }else{
      this.tipoContaCadastro.tipoContaStatus = TipoContaStatus.ATIVO;
      this.defaultService.save(this.tipoContaCadastro, "tipo-conta")
        .subscribe({
          next: res =>{
            this.buscaTiposConta();
          },
          error: error =>{
            this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
          },
          complete: () => {
            this.loading=false;
          }
        })
    }

  }

  private buscaTiposConta() {
    this.loading=true;
    this.defaultService.get('tipo-conta?sort=nome,asc')
      .subscribe({
        next: res =>{
          this.tipos = res;
        },
        error: error =>{
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
        },
        complete: () => {
            this.loading=false;
        }
      });
  }
}
