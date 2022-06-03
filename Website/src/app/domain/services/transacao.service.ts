import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransacaoRepository } from "src/app/data/repositories/transacao.repository";

@Injectable({
    providedIn: 'root'
 })
 export class TransacaoService {
 
    httpOptions = {
       Headers : new HttpHeaders({
          'Content-Type': 'application/json'
       }),
       responseType: 'text' as 'json'
    };
 
    constructor(
       private carteiraRepository: TransacaoRepository
    ) { }
 
    ListTransacaoByCarteira(id : number){
        return this.carteiraRepository.ListTransacaoByCarteiraAsync(id).pipe(ret => {
            return ret;
        });
    
      }
 }