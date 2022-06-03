
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Transacao } from "src/app/domain/models/transacao";
import { environment } from "src/environments/environment";

@Injectable({
providedIn: 'root'
})  
export class TransacaoRepository {  
    private apiUrl = environment.apiUrl;

    httpOptions = {
        Headers : new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'text' as 'json'
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    ListTransacaoByCarteiraAsync(id : number): Observable<Transacao[]>  {
        return this.httpClient.get(environment.apiUrl + "/api/Carteira/list-transacoes?carteiraId=" + id)
        .pipe(
            map((res: any) =>  {
                console.log("repository", res);
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
}

