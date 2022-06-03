import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SaqueRepository } from "src/app/data/repositories/saque.repository";
import { Saque } from "../models/saque";


@Injectable({
   providedIn: 'root'
})
export class SaqueService {

   httpOptions = {
      Headers : new HttpHeaders({
         'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
   };

   constructor(
      private saqueRepository: SaqueRepository
   ) { }

   Sacar(newSaque: Saque) {
      return this.saqueRepository.PostSaque(newSaque).pipe(ret => {
         return ret;
      });
   }

   GetSaque(saqueId : number){
      return this.saqueRepository.GetSaque(saqueId).pipe(ret => {
         return ret;
      });
   }

   ListSaquesByCarteiraId(carteiraId: number) {
      return this.saqueRepository.ListSaquesByCarteiraId(carteiraId).pipe(ret => {
         return ret;
      });
   }

}
