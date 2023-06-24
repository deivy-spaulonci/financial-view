import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DefaultService} from "../../service/default.service";
import {Fornecedor} from "../../model/fornecedor";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-acfornecedor',
  templateUrl: './acfornecedor.component.html',
  styleUrls: ['./acfornecedor.component.css']
})
export class AcfornecedorComponent {
  fornecedores:Fornecedor[]= [];
  @Input() largInput:string='100%';
  @Input() control:any;
  @Input() groupName:any;
  model:any;
  @Output() emmitModel:EventEmitter<any>=new EventEmitter;

  constructor(private defaultService: DefaultService) {
  }
  filterFornecedor(event: any) {
    let query = event.query;
    this.defaultService.get('fornecedor/search/'+event.query)
      .subscribe(resultado => {
        this.fornecedores = resultado;
      });
  }

  changeModel($event:any){
    return this.emmitModel.emit(this.model);
  }
}
