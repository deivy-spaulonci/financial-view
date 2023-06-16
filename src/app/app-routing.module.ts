import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./view/home/home.component";
import {DespesaComponent} from "./view/despesa/despesa.component";
import {FornecedorComponent} from "./view/fornecedor/fornecedor.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'despesa', component: DespesaComponent },
  { path: 'fornecedor', component: FornecedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }