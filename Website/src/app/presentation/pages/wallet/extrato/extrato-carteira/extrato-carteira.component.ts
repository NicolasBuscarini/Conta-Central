import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { Transacao } from 'src/app/domain/models/transacao';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-extrato-carteira',
  templateUrl: './extrato-carteira.component.html',
  styleUrls: ['./extrato-carteira.component.scss']
})
export class ExtratoCarteiraComponent implements OnInit {
  selectedCarteira: Carteira;
  transacoes: Transacao[];

    constructor(private carteiraService: CarteiraService) {
      this.selectedCarteira = this.carteiraService.selectedCarteira;
    }
  
   ngOnInit(): void {
      this.carteiraService.listCarteiraTransacoes(this.selectedCarteira.id).subscribe(transacoes => {
         this.transacoes = transacoes;
      });
   }
  
  }
  