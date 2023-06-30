import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./view/home/home.component";
import {FornecedorComponent} from "./view/fornecedor/fornecedor.component";
import {ContaComponent} from "./view/conta/conta.component";
import {TipoContaComponent} from "./view/tipo-conta/tipo-conta/tipo-conta.component";
import {DespesaListComponent} from "./view/despesa/despesa-list/despesa-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'despesa', component: DespesaListComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'conta', component: ContaComponent },
  { path: 'tipo-conta', component: TipoContaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
