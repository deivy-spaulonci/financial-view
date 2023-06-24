import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig, TreeNode} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {TreeNodeSelectEvent} from "primeng/tree";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title : string = 'Financial';
  items: MenuItem[] = [];
  nodes!: TreeNode[];
  menuVisible: boolean=false;
  constructor(private config: PrimeNGConfig,
              private router: Router,
              private translateService: TranslateService) {

  }
  ngOnInit() {
    this.translateService.setDefaultLang('pt');
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/'},
      { label: 'Despesa', icon: 'pi pi-fw pi-dollar', routerLink: '/despesa'},
      { label: 'Fornecedor', icon: 'pi pi-fw pi-box', routerLink: '/fornecedor' },
      { label: 'Contas', icon: 'pi pi-fw pi-credit-card', routerLink: '/conta' }
    ];

    this.nodes = [
      {
        key: '0',
        label: 'Financiero',
        icon: 'pi pi-fw pi-home',
        expanded:true,
        children: [
          {
            key: '0-0',
            label: 'Despesa',
            icon: 'pi pi-fw pi-dollar',
            data: '/despesa',
            expanded:true
          },{
            key: '0-1',
            label: 'Fornecedor',
            data: '/fornecedor',
            icon: 'pi pi-fw pi-box',
          },{
            key: '0-1',
            label: 'Contas',
            data: '/conta',
            icon: 'pi pi-fw pi-credit-card',
            expanded:true,
            children: [
              { key: '0-1-0',
                label: 'Tipo Conta',
                data: '/tipo-conta',
                icon: 'pi pi-fw pi-file'}
            ]
          }
        ]
      },
    ];

    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      clear: 'Limpar',
      emptyMessage: 'Nenhum registro encontrado!'
      //translations
    });
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  nodeSelect(event: TreeNodeSelectEvent) {
    this.router.navigate([event.node.data]);
    this.menuVisible = false;

  }
}
