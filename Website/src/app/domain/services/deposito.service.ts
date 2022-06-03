import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DepositoRepository } from "src/app/data/repositories/deposito.repository";
import { Deposito } from "../models/deposito";

@Injectable({
    providedIn: 'root'
 })
 export class DepositoService {

   httpOptions = {
      Headers : new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
   };

   public depositoView: Deposito;
 
   constructor(
       private depositoRepository: DepositoRepository
    ) { 

    }
 
   depositar(deposito: Deposito) {
      return this.depositoRepository.depositar(deposito).pipe(ret => {
         return ret;
      });
   }

   listDepositosByCarteiraId(carteiraId: number) {
      return this.depositoRepository.listDepositosByCarteiraId(carteiraId).pipe(ret => {
         return ret;
      });
   }

   getDeposito(id: number) {
      return this.depositoRepository.getDeposito(id).pipe(ret => {
         return ret;
      });
   }

   setDepositoView(deposito): void {
      this.depositoView = deposito;
   }

}