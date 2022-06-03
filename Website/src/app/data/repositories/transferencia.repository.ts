import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Transferencia } from "src/app/domain/models/transferencia";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TransferenciaRepository{
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
    
    CreateTransferencia(transferencia : Transferencia): Observable<Transferencia>  {
        return this.httpClient.post<Transferencia>(environment.apiUrl + "/api/Transferencia/transferir", transferencia, this.httpOptions)
        .pipe(
            map((ret: Transferencia) => {
                return ret;
                }
            )
        );
    }

    ListTransferencias(carteiraId: number): Observable<Transferencia[]> {
        return this.httpClient.get(environment.apiUrl + "/api/Transferencia/list-transferencias-by-carteira-id?carteiraId=" + carteiraId)
            .pipe(map((res: any) =>  {
                return res.map(item => {
                    return new Transferencia(
                        item.id,
                        item.valor,
                        item.dataHora,
                        item.descricao,
                        item.fromCarteiraId,
                        item.fromCarteira,
                        item.toCarteiraId,                            
                        item.toCarteira
                    )
                }
            )
        }));
    } 
    
    GetTransferenciaById(transferenciaId: number): Observable<Transferencia> {
        return this.httpClient.get(environment.apiUrl + "/api/Transferencia/get-transferencia-by-id?transferenciaId=" + transferenciaId)
        .pipe(
            map((ret: Transferencia) => {
                return ret;
                }
            )
        );
    }
}
