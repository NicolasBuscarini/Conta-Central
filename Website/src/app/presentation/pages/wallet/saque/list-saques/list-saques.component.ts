import { Component, OnInit } from '@angular/core';
import { Saque } from 'src/app/domain/models/saque';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { SaqueService } from 'src/app/domain/services/saque.service';

@Component({
  selector: 'app-list-saques',
  templateUrl: './list-saques.component.html',
  styleUrls: ['./list-saques.component.css']
})
export class ListSaquesComponent implements OnInit {

  listaSaque: Saque[];
  saque: Saque;

  constructor(
    public carteiraService: CarteiraService,
    public authenticationService: AuthenticationService,
    public saqueService: SaqueService,

  ) { }


  ngOnInit(): void {

    this.ListaSaques(1)
  }

   ListaSaques(carteiraId : number){
     this.saqueService.ListSaquesByCarteiraId(carteiraId).subscribe(a => {
       this.listaSaque = a;
     })
   }

  getCarteira(carteiraId: number): void {
    this.carteiraService.getCarteira(carteiraId).subscribe(x => {
    });
  }

}
