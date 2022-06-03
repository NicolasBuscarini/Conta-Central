import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RelatorioCarteira } from "src/app/domain/models/relatorioCarteira";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class RelatorioRepository {

	private apiUrl = environment.apiUrl;

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	 };

	constructor(
		private httpClient: HttpClient
	) { }

	GerarRelatorioByUser(ano: number): Observable<RelatorioCarteira[]> {
		return this.httpClient.post(`${this.apiUrl}/api/Relatorio/gerar-relatorio-by-user`, ano, this.httpOptions)
		.pipe(
			map((ret: any) => {
				return ret;
			})
		);
	}

	GetRelatorioByUser(ano: number): Observable<RelatorioCarteira[]> {
		return this.httpClient.get(`${this.apiUrl}/api/Relatorio/get-relatorio-by-user?ano=` + ano)
			.pipe(
				map((ret: RelatorioCarteira[]) => {
					return ret;
				})
			);
	}

	ListRelatorioAnosDisponiveis(): Observable<number[]> {
		return this.httpClient.get(`${this.apiUrl}/api/Relatorio/list-relatorio-anos-disponiveis`)
			.pipe(
				map((ret: number[]) => {
					return ret;
				})
			);
	}

	ListAnosDisponiveisToCreateRelatorio(): Observable<number[]> {
		return this.httpClient.get(`${this.apiUrl}/api/Relatorio/list-anos-disponiveis-to-create-relatorio`)
			.pipe(
				map((ret: number[]) => {
					return ret;
				})
			);
	}
}
