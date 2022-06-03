import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-carteiras',
  templateUrl: './carteiras.component.html',
  styleUrls: ['./carteiras.component.scss']
})
export class CarteirasComponent implements OnInit {

	public listCarteira: Carteira[];

	constructor(
		public carteiraService: CarteiraService,
		public authenticationService: AuthenticationService,
	) { }

	ngOnInit(): void {
		this.carteiraService.listMinhasCarteiras().subscribe(x => {
			this.listCarteira = x;
		});
	}

	setSelectedCarteira(carteira: Carteira): void {
		this.carteiraService.setSelectedCarteira(carteira);
	}

}