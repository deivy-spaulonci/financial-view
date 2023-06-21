import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit{

  loading:boolean = false;

  ngOnInit(): void {
  }
}
