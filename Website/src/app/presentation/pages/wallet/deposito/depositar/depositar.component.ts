import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { DepositoService } from 'src/app/domain/services/deposito.service';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.scss']
})
export class DepositarComponent implements OnInit {

	public depositoForm: FormGroup;
	public error: string = "";
	public success: string = "";

	public selectedCarteira: Carteira;

	constructor(
		private formBuilder: FormBuilder,

		public carteiraService: CarteiraService,
		public authenticationService: AuthenticationService,
		public depositoService: DepositoService,
	) { }

	ngOnInit(): void {
		this.selectedCarteira = this.carteiraService.selectedCarteira;

		this.depositoForm = this.formBuilder.group({
			carteiraId: ['', Validators.required],
			valor: ['', Validators.required],
			descricao: '',
			externalName: '',
			externalId: 0
		});
	}

	get fDeposito() { return this.depositoForm.controls; }

	depositar() {
		this.fDeposito.carteiraId.setValue(this.carteiraService.selectedCarteira.id);

		if (this.depositoForm.invalid || this.fDeposito.valor.value <= 0) {
			this.error = "Deposito falhou!"
			console.log(this.error);
			return;
		}
		if (this.fDeposito.externalId.value == null) {
			this.fDeposito.externalId.setValue(0);
		}

		console.log(this.depositoForm.value)
		this.depositoService.depositar(this.depositoForm.value).subscribe(result => { });
		this.depositoForm.reset();
		this.error = "";
		this.success = "Deposito Realizado";
	}

}
