import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateModule} from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { HomeComponent } from './view/home/home.component';
import { DespesaComponent } from './view/despesa/despesa.component';
import { DespesaListComponent } from './view/despesa/despesa-list/despesa-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import {HttpClientModule} from "@angular/common/http";
import { DespesaFormComponent } from './view/despesa/despesa-form/despesa-form.component';
import {LoadingComponent} from "./comp/loading/loading.component";

import localept from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import { FornecedorComponent } from './view/fornecedor/fornecedor.component';
import { FornecedorFormComponent } from './view/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './view/fornecedor/fornecedor-list/fornecedor-list.component';
import { CnpjPipe } from './pipe/cnpj.pipe';
import { ContaComponent } from './view/conta/conta.component';
import { ContaListComponent } from './view/conta/conta-list/conta-list.component';
import { ContaFormComponent } from './view/conta/conta-form/conta-form.component';

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DespesaComponent,
    DespesaListComponent,
    DespesaFormComponent,
    FornecedorComponent,
    FornecedorFormComponent,
    FornecedorListComponent,
    CnpjPipe,
    LoadingComponent,
    ContaComponent,
    ContaListComponent,
    ContaFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ButtonModule,
    PanelModule,
    SidebarModule,
    MenubarModule,
    TabViewModule,
    ToolbarModule,
    TabMenuModule,
    TableModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    InputTextModule,
    KeyFilterModule,
    CalendarModule,
    ContextMenuModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    InputMaskModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    OverlayPanelModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
