import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  choice = 'user';

  constructor() { }

  ngOnInit(): void {
  }

  toggle(id: number){
    if (id == 1){
      this.choice = 'user';
    }
    else if(id == 2){
      this.choice = 'carteira';
    }
    else {
      this.choice = null;
    }
  }
}
