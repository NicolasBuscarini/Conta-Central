import { Component, OnInit } from '@angular/core';
import { Cobranca } from 'src/app/domain/models/cobranca';
import { User } from 'src/app/domain/models/user';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CobrancaService } from 'src/app/domain/services/cobranca.service';

@Component({
  selector: 'app-cobrancas',
  templateUrl: './cobrancas.component.html',
  styleUrls: ['./cobrancas.component.scss']
})
export class CobrancasComponent implements OnInit {
  cobrancasList: Cobranca[];
  cobrancaIsEmpty: Boolean;
  user: User;

  constructor(
    private cobrancaService: CobrancaService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.cobrancasPendentes();
    this.user = this.authService.currentUser;
  }

  cobrancasPendentes() {
    return this.cobrancaService.cobrancasPendentes().subscribe(ret => {
      this.cobrancasList = ret;
      this.CobrancaIsEmpty();
    });
  }

  CobrancaIsEmpty() {
    if(this.cobrancasList.length > 0){
      this.cobrancaIsEmpty = false;
    }else{
      this.cobrancaIsEmpty = true;
    }
  }

}