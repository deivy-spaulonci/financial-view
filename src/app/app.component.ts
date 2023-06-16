import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title : string = 'financial-view';
  items: MenuItem[] = [];
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}
  ngOnInit() {
    this.translateService.setDefaultLang('pt');
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/'},
      { label: 'Despesa', icon: 'pi pi-fw pi-dollar', routerLink: '/despesa'},
      { label: 'Fornecedor', icon: 'pi pi-fw pi-box', routerLink: '/fornecedor' },
      { label: 'Contas', icon: 'pi pi-fw pi-credit-card' }
    ];

    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      clear: 'Limpar'
      //translations
    });
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
