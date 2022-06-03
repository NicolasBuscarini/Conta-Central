import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-carteira-view',
  templateUrl: './carteira-view.component.html',
  styleUrls: ['./carteira-view.component.scss']
})
export class CarteiraViewComponent implements OnInit {

	public selectedCarteira: Carteira;

	constructor(
		public carteiraService: CarteiraService,
		public authenticationService: AuthenticationService,
	) { }

	ngOnInit(): void {
		this.selectedCarteira = this.carteiraService.selectedCarteira;
	}

	setSelectedCarteira(carteira: Carteira): void {
		this.carteiraService.setSelectedCarteira(carteira);
	}

}
