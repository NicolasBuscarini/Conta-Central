import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { Transferencia } from 'src/app/domain/models/transferencia';
import { User } from 'src/app/domain/models/user';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { TransferenciaService } from 'src/app/domain/services/transferencia.service';

@Component({
   selector: 'app-transferencias',
   templateUrl: './transferencias.component.html',
   styleUrls: ['./transferencias.component.scss']
})
export class TransferenciasComponent implements OnInit {
   selectedCarteira: Carteira;
   currentUser: User;

   transferencias: Transferencia[];

   constructor(
      public transferenciaService: TransferenciaService,
      public carteiraService: CarteiraService,
      public authService: AuthenticationService
   ) {
      this.selectedCarteira = this.carteiraService.selectedCarteira;
      this.currentUser = this.authService.currentUser;
   }

   ngOnInit(): void {
      this.listTransferencias();
   }

   listTransferencias() {
      return this.transferenciaService.listTransferenciaByCarteiraId(this.selectedCarteira.id)
         .subscribe(data => {
            this.transferencias = data;
         });
   }
   
   setTransferenciaView(transferencia) {
      this.transferenciaService.setTransferenciaView(transferencia);
   }

}
