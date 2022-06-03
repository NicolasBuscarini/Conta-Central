import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { Deposito } from 'src/app/domain/models/deposito';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { DepositoService } from 'src/app/domain/services/deposito.service';

@Component({
  selector: 'app-deposito-list',
  templateUrl: './deposito-list.component.html',
  styleUrls: ['./deposito-list.component.scss']
})
export class DepositoListComponent implements OnInit {

	public selectedCarteira: Carteira;
	public listDeposito: Deposito[];
	public deposito: Deposito;

	constructor(
		private carteiraService: CarteiraService,
		private depositoService: DepositoService
	){ }

	ngOnInit(): void {
		this.selectedCarteira = this.carteiraService.selectedCarteira;
		this.depositoService.listDepositosByCarteiraId(this.selectedCarteira.id).subscribe(data => {
			this.listDeposito = data;
		});
	}

	setDeposito(deposito: Deposito) {
		this.depositoService.setDepositoView(deposito);
	}

}
