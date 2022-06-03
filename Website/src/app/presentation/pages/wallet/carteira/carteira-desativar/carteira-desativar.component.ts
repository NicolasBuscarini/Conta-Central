import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-carteira-desativar',
  templateUrl: './carteira-desativar.component.html',
  styleUrls: ['./carteira-desativar.component.scss']
})
export class CarteiraDesativarComponent implements OnInit {

  public selectedCarteira: Carteira;
  public error: string;

  constructor(
     private router: Router,

     public carteiraService: CarteiraService,
     public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
     this.selectedCarteira = this.carteiraService.selectedCarteira;
  }

  desativar() {
     if (this.selectedCarteira == null) {
        this.error = "Não selecionou nenhuma carteira";
        return
     }
     if (this.selectedCarteira.saldo != 0) {
        this.error = "Impossível apagar carteira com saldo";
        return
     }

     this.carteiraService.desativarCarteira(this.selectedCarteira.id).subscribe(ret => { ret });
     this.router.navigateByUrl('/dash/carteiras');
  }

}

