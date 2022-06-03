import { Component, OnInit } from '@angular/core';
import { Transacao } from 'src/app/domain/models/transacao';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-extrato-user',
  templateUrl: './extrato-user.component.html',
  styleUrls: ['./extrato-user.component.scss']
})
export class ExtratoUserComponent implements OnInit {

	transacoes: Transacao[];
	constructor(private carteiraService: CarteiraService) {
	}

	ngOnInit(): void {
		this.carteiraService.listUserTransacoes().subscribe(transacoes =>
			this.transacoes = transacoes
		);
	}

}
