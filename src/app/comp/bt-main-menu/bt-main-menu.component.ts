import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-bt-main-menu',
  templateUrl: './bt-main-menu.component.html',
  styleUrls: ['./bt-main-menu.component.css']
})
export class BtMainMenuComponent implements OnInit{

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Despesa',
        items: [
          {
            label: 'Consulta',icon: 'pi pi-refresh',command: () => {
              alert();
            }
          },
          {
            label: 'Cadastro',icon: 'pi pi-times',command: () => {
              alert();
            }
          }
        ]
      },
      {
        label: 'Conta',
        items: [
          {
            label: 'Consulta',
            icon: 'pi pi-external-link',
            url: 'http://angular.io'
          },
          {
            label: 'Cadastro',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
          },
          {
            label: 'Tipo Conta',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
          }
        ]
      }
    ];
  }

}
