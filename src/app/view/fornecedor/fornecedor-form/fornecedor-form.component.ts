import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {DefaultService} from "../../../service/default.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Util} from "../../../util/util";
import {Fornecedor} from "../../../model/fornecedor";
import {Cidade} from "../../../model/cidade";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
  providers: [MessageService]
})
export class FornecedorFormComponent implements OnInit{

  util: Util = new Util();
  fornecedorCadastro:Fornecedor=new Fornecedor();
  fornecedorform!: FormGroup;
  loading:boolean=false;
  filteredCidades!: Cidade[];

  constructor(private defaultService: DefaultService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.fornecedorform = this.fb.group({
      inputCNPJ : new FormControl('', Validators.required),
      inputNome: new FormControl('', Validators.required),
      inputRazaoSocial: new FormControl('', Validators.required),
      comboCidade: new FormControl('', Validators.required)
    });
    this.fornecedorCadastro.cidade = new Cidade();
  }

  buscaCnpj(event: any){
    this.loading = true;
    const cnpj = this.fornecedorform.controls['inputCNPJ'].value.replace(/[^0-9]+/g, '');

    this.defaultService.get('fornecedor/consultacnpj?cnpj=' + cnpj)
      .subscribe({
          next: resultado => {

            if(resultado && resultado.status!='ERROR'){
              this.fornecedorform.controls['inputNome'].setValue(this.util.capitalize((resultado.fantasia ? resultado.fantasia : resultado.nome)));
              this.fornecedorform.controls['inputRazaoSocial'].setValue(this.util.capitalize(resultado.nome));
              this.fornecedorform.controls['comboCidade'].setValue(this.util.capitalize(resultado.municipio));
              this.defaultService.get('cidade/' + this.util.capitalize(resultado.municipio)).subscribe(retornocidades => {
                this.filteredCidades = retornocidades;
                this.fornecedorform.controls['comboCidade'].setValue(this.filteredCidades[0])
              });
            }else{
              this.messageService.add({severity: 'error', summary: 'Erro', detail: resultado.messge});
            }
        },
        error: error => {

          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.messageerror});
        },
        complete: ()=>{ this.loading = false; }
      });
  }

  filterCidades(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    this.loading = true;
    this.defaultService.get('cidade/' + query)
      .subscribe({
        next: retornocidades => {
          this.filteredCidades = retornocidades;
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.messageerror});
        },
        complete: ()=>{ this.loading = false; }
      });
  }
  onSubmit(value: string) {
    this.loading = true;
    this.fornecedorCadastro.nome = this.fornecedorform.controls['inputNome'].value;
    this.fornecedorCadastro.razaoSocial = this.fornecedorform.controls['inputRazaoSocial'].value;
    this.fornecedorCadastro.cidade = this.fornecedorform.controls['comboCidade'].value;
    this.fornecedorCadastro.cnpj = this.fornecedorform.controls['inputCNPJ'].value.replace(/\D/g, "");

    this.defaultService.save(this.fornecedorCadastro, 'fornecedor')
      .subscribe({
        next: resultado => {
          this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Fornecedor salva com sucesso'});
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: error.message});
          this.loading = false;
        },
        complete: () => {
          this.fornecedorform.reset();
          this.fornecedorCadastro = new Fornecedor();
          this.fornecedorCadastro.cidade = new Cidade();

          this.loading = false;
        }
      });
  }
}
