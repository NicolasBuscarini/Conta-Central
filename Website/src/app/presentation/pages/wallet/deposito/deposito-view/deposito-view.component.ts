import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { Deposito } from 'src/app/domain/models/deposito';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { DepositoService } from 'src/app/domain/services/deposito.service';

@Component({
  selector: 'app-deposito-view',
  templateUrl: './deposito-view.component.html',
  styleUrls: ['./deposito-view.component.scss']
})
export class DepositoViewComponent implements OnInit {

	public listDeposito: Deposito[];
	public selectedCarteira: Carteira;
	public deposito: Deposito;

	constructor(
		private carteiraService: CarteiraService,
		private depositoService: DepositoService,
	) { }

	ngOnInit(): void {
		this.getDepositoByListDeposito()

		this.selectedCarteira = this.carteiraService.selectedCarteira;
		this.depositoService.listDepositosByCarteiraId(this.carteiraService.selectedCarteira.id).subscribe(ret => {
			this.listDeposito = ret;
		})
	}

	getDeposito(id: number) {
		this.depositoService.getDeposito(id).subscribe(ret => {
			this.deposito = ret;
		});
	}

	getDepositoByListDeposito() {
		this.deposito = this.depositoService.depositoView;
	}

}

