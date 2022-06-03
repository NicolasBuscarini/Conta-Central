import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { RelatorioRepository } from "src/app/data/repositories/relatorio.repository";
import { RelatorioCarteira } from "../models/relatorioCarteira";
import { RelatorioCarteiraMes } from "../models/relatorioCarteiraMes";

@Injectable({
    providedIn: 'root'
 })
 export class RelatorioService {

   httpOptions = {
      Headers : new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
   };
 
   constructor(
       private relatorioRepository: RelatorioRepository
    ) { 

    }
 
   GerarRelatorioByUser(ano: number) {
      return this.relatorioRepository.GerarRelatorioByUser(ano).pipe(ret => {
         return ret;
      });
   }

   ListRelatorioAnosDisponiveis() {
      return this.relatorioRepository.ListRelatorioAnosDisponiveis().pipe(ret => {
         return ret;
      });
   }

   ListAnosDisponiveisToCreateRelatorio() {
      return this.relatorioRepository.ListAnosDisponiveisToCreateRelatorio().pipe(ret => {
         return ret;
      });
   }

   GetRelatorioByUser(ano: number) {
      return this.relatorioRepository.GetRelatorioByUser(ano).pipe(ret => {
         return ret;
      });
   }

   SomaTotais(relatoriosCarteira: RelatorioCarteira[]){
      let totais: number[] = [];
      relatoriosCarteira.forEach((relatorioCarteira: RelatorioCarteira) => {
         relatorioCarteira.relatorioRecDespItems.forEach((relatorioCarteiraMes: RelatorioCarteiraMes) => {
            let mes = relatorioCarteiraMes.periodo -1;
            if(totais[mes] == undefined){
               totais[mes] = 0;
            }
            totais[mes] += relatorioCarteiraMes.total;
         });
      });
      return totais;
   }
   
}