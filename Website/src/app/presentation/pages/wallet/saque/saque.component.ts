import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { SaqueService } from 'src/app/domain/services/saque.service';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.scss']
})
export class SaqueComponent implements OnInit {

  public saqueForm: FormGroup;
  public error = '';
  public success: string = '';

  listCarteira: Carteira[];

  minhaCarteira: Carteira;
  carteiraNome = '';
  carteiraSaldo = 0;
  carteiraId: number = 0;

  constructor(
    private formBuilder: FormBuilder,

    public carteiraService: CarteiraService,
    public authenticationService: AuthenticationService,
    public saqueService: SaqueService,

  ) { 
    this.carteiraService.listMinhasCarteiras().subscribe(x => {
      this.listCarteira = x;
    });
  }


  ngOnInit(): void {
    this.saqueForm = this.formBuilder.group({
      valor: ['', Validators.required],
      descricao: '',
      carteiraId: ['', Validators.required]
    });
  }

  get fSaque() { return this.saqueForm.controls; }

  getCarteira(carteiraId : number) : void {
    this.carteiraService.getCarteira(carteiraId).subscribe(x => {
    this.minhaCarteira = x;
    this.carteiraSaldo = x.saldo;
    this.carteiraId = x.id;
    this.carteiraNome = x.nome;
    });
  }

  get fDeposito() { return this.saqueForm.controls; }

  sacar() {
    if (this.saqueForm.invalid || this.fDeposito.valor.value <= 0) {
      this.error = "Saque falhou!"
      console.log(this.error);
      return;
    }

    console.log(this.saqueForm.value)
    this.saqueService.Sacar(this.saqueForm.value).subscribe(result => { });
    this.saqueForm.reset();
    this.success = "Saque Realizado"
  }

}
