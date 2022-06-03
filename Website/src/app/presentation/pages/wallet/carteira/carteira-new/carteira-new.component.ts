import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-carteira-new',
  templateUrl: './carteira-new.component.html',
  styleUrls: ['./carteira-new.component.scss']
})
export class CarteiraNewComponent implements OnInit {

	public newCarteiraForm: FormGroup;
	public error: string = '';
	public success: string = '';

	constructor(
		private formBuilder: FormBuilder,

		public carteiraService: CarteiraService,
		public authenticationService: AuthenticationService,
	) { }

	ngOnInit(): void {
		this.newCarteiraForm = this.formBuilder.group({
			nome: ['', Validators.required]
		});
	}

	get fNewCarteira() { return this.newCarteiraForm.controls; }

	criarCarteira() {
		console.log(this.newCarteiraForm.value);
		if (this.newCarteiraForm.invalid) {
			this.error = "Nova Carteira falhou!"
			console.log(this.error);
			return;
		}

		this.carteiraService.createCarteira(this.newCarteiraForm.value).subscribe(ret => { ret });		
		this.newCarteiraForm.reset();
		this.success = "Nova Carteira Criada"
		
	}
}
