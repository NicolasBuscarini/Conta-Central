import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cobranca } from 'src/app/domain/models/cobranca';
import { User } from 'src/app/domain/models/user';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { CobrancaService } from 'src/app/domain/services/cobranca.service';

@Component({
  selector: 'app-cobranca-pendente',
  templateUrl: './cobranca-pendente.component.html',
  styleUrls: ['./cobranca-pendente.component.scss']
})
export class CobrancaPendenteComponent implements OnInit {

  @Input("cobranca") cobranca: Cobranca;
  @Output("update") update = new EventEmitter();
  user: User;
  error: string;

  confirmPagamento: number = 0;

  constructor(
    private cobrancaService: CobrancaService,
    private authService: AuthenticationService,
    private carteiraService: CarteiraService
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  reset(){
    this.confirmPagamento = 0;
  }

  async pagarCobranca(cobrancaId: number){
    let carteira = await this.carteiraService.getCarteira(this.cobranca.toCarteiraId).toPromise();

    if(carteira.saldo < this.cobranca.valor){
      this.error = "Saldo Insuficiente";
      return;
    }
    this.confirmPagamento += 1;
    if(this.confirmPagamento == 2){
      return this.cobrancaService.pagarCobranca(cobrancaId).subscribe(ret => {
      this.update.emit("atualizar lista");
      return ret;
    })}
    
  }

  rejeitarCobranca(cobrancaId: number){
    return this.cobrancaService.rejeitarCobranca(cobrancaId).subscribe(ret => {
      this.update.emit("atualizar lista");
      return ret;
    })
  }

}
