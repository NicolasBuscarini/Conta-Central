import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferenciaRepository } from "src/app/data/repositories/transferencia.repository";
import { Transferencia } from "../models/transferencia";

@Injectable({
    providedIn: 'root'
 })
export class TransferenciaService{
    httpOptions = {
        Headers : new HttpHeaders({
           'Content-Type': 'application/json'
        }),
        responseType: 'text' as 'json'
    };

    public transferenciaView: Transferencia;

    constructor(
        public transferenciaRepository: TransferenciaRepository
    ){ }

    transferir(transferencia: Transferencia) {
        return this.transferenciaRepository.CreateTransferencia(transferencia);
    }

    listTransferenciaByCarteiraId(carteiraId: number) {
        return this.transferenciaRepository.ListTransferencias(carteiraId)
        .pipe(data => {
            return data;
        });
    }

    getTransferenciaById(transferenciaId: number) {
        return this.transferenciaRepository.GetTransferenciaById(transferenciaId)
        .pipe(data => {
            return data;
        })
    }

    setTransferenciaView(transferencia: Transferencia){
        this.transferenciaView = transferencia;
    }
}