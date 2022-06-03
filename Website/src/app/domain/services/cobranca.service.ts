import { Injectable } from "@angular/core";
import { CobrancaRepository } from "src/app/data/repositories/cobranca.repository";
import { CobrancaDTO } from "../models/cobrancaDto";

@Injectable({
   providedIn: 'root'
})
export class CobrancaService{
   constructor(
      private cobrancaRepository: CobrancaRepository
   ) { }

   createCobranca(cobrancaDto: CobrancaDTO) {
      return this.cobrancaRepository.CreateCobranca(cobrancaDto)
      .pipe(ret => {
         return ret;
      })
   }

   pagarCobranca(cobrancaId: number){
      return this.cobrancaRepository.PagarCobranca(cobrancaId)
      .pipe(ret => {
         return ret;
      })
   }

   rejeitarCobranca(cobrancaId: number) {
      return this.cobrancaRepository.RejeitarCobranca(cobrancaId)
      .pipe(ret => {
         return ret;
      })
   }

   cobrancasPendentes() {
      return this.cobrancaRepository.CobrancasPendentes()
      .pipe(ret => {
         return ret;
      })
   }

}