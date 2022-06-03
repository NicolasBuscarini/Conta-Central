
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Saque } from "src/app/domain/models/saque";
import { environment } from "src/environments/environment";

@Injectable({
providedIn: 'root'
})  
export class SaqueRepository {  
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

    PostSaque(newSaque: Saque ): Observable<Saque>  {
        return this.httpClient.post(`${this.apiUrl}/api/Saque/sacar`, newSaque, this.httpOptions)
        .pipe(
            map((ret: Saque) => {
                return ret;
                }
            )
        );
    }

    GetSaque(saqueId: number): Observable<Saque> {
        return this.httpClient.get(`${this.apiUrl}/api/Saque/saque-by-id?saqueId=`+ saqueId)
        .pipe(
            map((ret: Saque) => {
                return ret;
                }
            )
        );
    }

    ListSaquesByCarteiraId(carteiraId : number): Observable<Saque[]>  {
        return this.httpClient.get(`${this.apiUrl}/api/Saque/list-saques-by-carteira-id?carteiraId=${carteiraId}`)
        .pipe(
            map((res: any) =>  {
                console.log("repository", res);
                return res.map(item => {
                    return new Saque(
                        item.id,
                        item.dataHora,
                        item.valor,
                        item.descricao,
                        item.carteiraId
                    );
                });            
            })
        );
    }

}
