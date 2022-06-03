import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CarteiraRepository } from "src/app/data/repositories/carteira.repository";
import { Carteira } from "../models/carteira";
import { CarteiraDTO } from "../models/DTO/carteiraDTO";
import { SearchDTO } from "../models/DTO/searchDTO";

@Injectable({
   providedIn: 'root'
})
export class CarteiraService {
   
   private selectedCarteiraSubject: BehaviorSubject<Carteira>;
   public selectedCarteiraObservable: Observable<Carteira>;

   constructor(
      private carteiraRepository: CarteiraRepository
   ) { 
         this.selectedCarteiraSubject = new BehaviorSubject<Carteira>(JSON.parse(localStorage.getItem('selectedCarteira')));
         this.selectedCarteiraObservable = this.selectedCarteiraSubject.asObservable();
     }

   public get selectedCarteira(): Carteira {
      return this.selectedCarteiraSubject.value;
   }

   createCarteira(newCarteira: Carteira) {
      return this.carteiraRepository.createCarteira(newCarteira).pipe(ret => {
         return ret;
      });
   }

   listMinhasCarteiras() {
      return this.carteiraRepository.listMinhasCarteiras().pipe(ret => {
         return ret;
      });
   }

   listCarteiraTransacoes(id: number) {
      return this.carteiraRepository.listCarteiraTransacoes(id).pipe(ret => {
         return ret;
      });
   }

   listUserTransacoes() {
      return this.carteiraRepository.listUserTransacoes().pipe(ret => {
         return ret;
      });
   }

   getCarteira(id: number) {
      return this.carteiraRepository.getCarteira(id).pipe(ret => {
         return ret;
      });
   }

   desativarCarteira(idCarteira: number) {
      return this.carteiraRepository.desativarCarteira(idCarteira).pipe(ret => {
         return ret;
      });
   }
   
   setSelectedCarteira(carteira: Carteira) {
      localStorage.setItem('selectedCarteira', JSON.stringify(carteira));
      this.selectedCarteiraSubject.next(carteira);
   }

   reset() {
      localStorage.removeItem('selectedCarteira');
      this.selectedCarteiraSubject.next(null);
   }

   searchCarteira(searchDTO: SearchDTO): Observable<CarteiraDTO[]> {
      return this.carteiraRepository.searchCarteira(searchDTO).pipe(ret => {
         return ret;
      });
   }
   
}
