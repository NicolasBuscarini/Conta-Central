import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { TransferenciaService } from 'src/app/domain/services/transferencia.service';

@Component({
  selector: 'app-transferencia-transferir',
  templateUrl: './transferencia-transferir.component.html',
  styleUrls: ['./transferencia-transferir.component.scss']
})
export class TransferenciaTransferirComponent implements OnInit {

  public transferenciaForm: FormGroup;
  public error = '';
  public success: string = '';
  public selectedCarteira: Carteira;

  constructor(
    private formBuilder: FormBuilder,

    public carteiraService : CarteiraService,
    public authenticationService: AuthenticationService,
    private transferenciaService: TransferenciaService
  ) {
        this.selectedCarteira = this.carteiraService.selectedCarteira;
    }

  get f() { return this.transferenciaForm.controls; }

  ngOnInit(): void {
    this.transferenciaForm = this.formBuilder.group({
    fromCarteiraId: [this.selectedCarteira.id, Validators.required],
    toCarteiraId: ['', Validators.required],
    valor: ['', Validators.required],
    descricao: ''
  });
  }

  transferir() {
    if (this.transferenciaForm.invalid || this.f.valor.value <= 0) {
      this.error = "Transferencia falhou!"
      return;
    }
    
    this.transferenciaService.transferir(this.transferenciaForm.value).subscribe(result => {});
    this.transferenciaForm.reset();
    this.success = "Transferencia realizada!"
  }

}
