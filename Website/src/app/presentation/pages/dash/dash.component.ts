import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  
  Carteiras: Carteira[];

  constructor( 
    private carteiraService: CarteiraService
  ) { }

  ngOnInit() {
    this.carteiraService.listMinhasCarteiras().subscribe(ret =>{
      this.Carteiras = ret;
    });
  }

}
