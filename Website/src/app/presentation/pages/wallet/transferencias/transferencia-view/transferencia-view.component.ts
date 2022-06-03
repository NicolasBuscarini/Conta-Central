import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Carteira } from 'src/app/domain/models/carteira';
import { Transferencia } from 'src/app/domain/models/transferencia';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { TransferenciaService } from 'src/app/domain/services/transferencia.service';

@Component({
  selector: 'app-transferencia-view',
  templateUrl: './transferencia-view.component.html',
  styleUrls: ['./transferencia-view.component.scss']
})
export class TransferenciaViewComponent implements OnInit {

  listaTransferencia: Transferencia[];
  transferencia: Transferencia;
  selectedCarteira: Carteira;
  transferenciaForm: FormGroup;

  constructor(
     public authenticationService: AuthenticationService,
     public transferenciaService: TransferenciaService,
     public carteiraService: CarteiraService,
     private formBuilder: FormBuilder
  ) {
     this.selectedCarteira = this.carteiraService.selectedCarteira;
     
  }

  ngOnInit(): void {
     this.listTransferencias();
     this.getTransferenciaByListTransferencia();

     this.transferenciaForm = this.formBuilder.group({
        id: ''
     })
  }

  get f() { return this.transferenciaForm.controls; }

  listTransferencias() {
     return this.transferenciaService.listTransferenciaByCarteiraId(this.selectedCarteira.id)
     .subscribe(data => {
        this.listaTransferencia = data;
     });  
  }

  toggle(id: number) {
     this.transferenciaService.getTransferenciaById(id).subscribe(ret => {
       this.transferencia = ret;
     });
  }

   getDeposito(id: number) {
      this.transferenciaService.getTransferenciaById(id).subscribe(ret => {
         this.transferencia = ret;
      });
   }

   getTransferenciaByListTransferencia() {
      this.transferencia = this.transferenciaService.transferenciaView;
   }

}
