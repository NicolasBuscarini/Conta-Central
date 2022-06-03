import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cobranca } from "src/app/domain/models/cobranca";
import { CobrancaDTO } from "src/app/domain/models/cobrancaDto";
import { environment } from "src/environments/environment";

@Injectable({
   providedIn: 'root'
})
export class CobrancaRepository {
   private apiUrl = environment.apiUrl;

	httpOptions = {
		Headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		responseType: 'text' as 'json'
	};

	constructor(private httpClient: HttpClient) { }

   CreateCobranca(cobrancaDto: CobrancaDTO): Observable<CobrancaDTO> {
      return this.httpClient.post<CobrancaDTO>(this.apiUrl + "/api/Cobranca/create-cobranca", cobrancaDto, this.httpOptions)
      .pipe(
         map((ret: CobrancaDTO) => {
            return ret;
         })
      );;
   }

   PagarCobranca(cobrancaId: number) {
      return this.httpClient.post(this.apiUrl + "/api/Cobranca/pagar-cobranca?cobrancaId=" + cobrancaId, this.httpOptions)
      .pipe(
         map(ret => {
            return ret;
         })
      );;
   }

   RejeitarCobranca(cobrancaId: number) {
      return this.httpClient.post(this.apiUrl + "/api/Cobranca/rejeitar-cobranca?cobrancaId=" + cobrancaId, this.httpOptions)
      .pipe(
         map(ret => {
            return ret;
         })
      );;
   }

   CobrancasPendentes(): Observable<Cobranca[]> {
      return this.httpClient.get(this.apiUrl + "/api/Cobranca/list-cobrancas-pendentes")
      .pipe(
         map((res: Cobranca[]) => {
            return res.map((item: Cobranca) => { 
               return new Cobranca(
                  item.id,
                  item.valor,
                  item.descricao,
                  item.data,
                  item.fromUserId,
                  item.fromUser,
                  item.toUserId,
                  item.toUser,
                  item.fromCarteiraId,
                  item.fromCarteira,
                  item.toCarteiraId,
                  item.toCarteira,
                  item.cobrancaAtiva
               );
            });
         })
      );;
   }

}