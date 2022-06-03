import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Deposito } from "src/app/domain/models/deposito";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class DepositoRepository {

	private apiUrl = environment.apiUrl;

	httpOptions = {
		Headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		responseType: 'text' as 'json'
	};

	constructor(
		private httpClient: HttpClient
	) { }

	depositar(newDeposito: Deposito): Observable<Deposito> {
		console.log("rpositorio", newDeposito);
		return this.httpClient.post(`${this.apiUrl}/api/Deposito/depositar`, newDeposito, this.httpOptions)
		.pipe(
			map((ret: Deposito) => {
				return ret;
			})
		);
	}

	listDepositosByCarteiraId(carteiraId: number): Observable<Deposito[]> {
		return this.httpClient.get(`${this.apiUrl}/api/Deposito/list-depositos-by-carteira-id?carteiraId=` + carteiraId)
			.pipe(
				map((res: any) => {
					return res.map(item => {
						return new Deposito(
							item.id,
							item.dataHora,
							item.valor,
							item.descricao,
							item.externalName,
							item.externalId,
							item.carteiraId
						);
					});
				})
			);
	}

	getDeposito(depositoId: number): Observable<Deposito> {
		return this.httpClient.get(`${this.apiUrl}/api/Deposito/get-deposito?depositoId=` + depositoId)
			.pipe(
				map((ret: Deposito) => {
					return ret;
				}
				)
			);
	}

}
