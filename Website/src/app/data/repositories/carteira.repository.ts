import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Carteira } from "src/app/domain/models/carteira";
import { CarteiraDTO } from "src/app/domain/models/DTO/carteiraDTO";
import { SearchDTO } from "src/app/domain/models/DTO/searchDTO";
import { Transacao } from "src/app/domain/models/transacao";
import { environment } from "src/environments/environment";

@Injectable({
   providedIn: 'root'
})
export class CarteiraRepository {

   private apiUrl = environment.apiUrl;

   httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   constructor(
      private httpClient: HttpClient
   ) { }

   listMinhasCarteiras(): Observable<Carteira[]> {
      return this.httpClient.get(`${this.apiUrl}/api/Carteira/list-minhas-carteiras`)
      .pipe(
         map((res: any) => {
            return res.map(item => {
               return new Carteira(
                  item.id,
                  item.nome,
                  item.saldo,
                  item.userId,
                  item.ativo,
                  item.principal
               );
            });
         })
      );
   }

   createCarteira(newCarteira: Carteira) {
      return this.httpClient.post(`${this.apiUrl}/api/Carteira/create-carteira`, newCarteira, this.httpOptions)
      .pipe(
         map((ret: Carteira) => {
            return ret;
         })
      );
   }

   getCarteira(newCarteira: number): Observable<Carteira> {
      return this.httpClient.get(`${this.apiUrl}/api/Carteira/get-carteira?carteiraId=` + newCarteira)
      .pipe(
         map((ret: Carteira) => {
            return ret;
         })
      );
   }

   desativarCarteira(carteiraId: number) {
      return this.httpClient.post(`${this.apiUrl}/api/Carteira/desativar-carteira`, carteiraId, this.httpOptions)
      .pipe(
         map((ret: boolean) => {
            return ret;
         })
      );
   }

   listCarteiraTransacoes(id: number): Observable<Transacao[]> {
      return this.httpClient.get(`${this.apiUrl}/api/Carteira/list-transacoes?carteiraId=` + id)
      .pipe(
         map((res: any) => {
            return res.map(item => {
               return new Transacao(
                  item.id,
                  item.valor,
                  item.dataHora,
                  item.descricao,
                  item.origemTipo,
                  item.origemId,
                  item.carteiraId
               );
            });
         })
      );
   }

   listUserTransacoes(): Observable<Transacao[]> {
      return this.httpClient.get(`${this.apiUrl}/api/Carteira/list-user-transacoes`)
      .pipe(
         map((res: any) => {
            return res.map((item: Transacao) => {
               return new Transacao(
                  item.id,
                  item.valor,
                  item.dataHora,
                  item.descricao,
                  item.origemTipo,
                  item.origemId,
                  item.carteiraId
               );
            });
         })
      );
   }

   searchCarteira(searchDTO: SearchDTO): Observable<CarteiraDTO[]> {
      return this.httpClient.post(`${this.apiUrl}/api/Carteira/search-carteira`, searchDTO, this.httpOptions)
      .pipe(
         map((res: CarteiraDTO[]) => {
            return res.map((item: CarteiraDTO) => {
               return new CarteiraDTO(
                  item.id,
                  item.nome,
                  item.userId
               );
            });
         })
      );
   }
   
}

