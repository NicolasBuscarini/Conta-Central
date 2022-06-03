import { Carteira } from "./carteira";

export class Transferencia{
    id: number;
    valor: number;
    dataHora: Date;
    descricao: string;

    fromCarteiraId: number;
    fromCarteira: Carteira;

    toCarteiraId: number;
    toCarteira: Carteira;

    constructor(id: number, valor: number, dataHora: Date, descricao: string, fromCarteiraId: number, fromCarteira: Carteira, toCarteiraId: number, toCarteira: Carteira,){
        this.id = id;
        this.valor = valor;
        this.dataHora = dataHora;
        this.descricao = descricao;
        this.fromCarteiraId = fromCarteiraId;
        this.fromCarteira = fromCarteira;
        this.toCarteiraId = toCarteiraId;
        this.toCarteira = toCarteira;       
    }
}