export class Saque{
    id : number = 0;
    dataHora: string = "";
    valor: number = 0;
    descricao: string = "";
    carteiraId: number = 0;

    constructor(id:number, dataHora: string, valor: number, descricao: string, carteiraId: number) {
        //specify your own constructor logic
        this.id = id;
        this.dataHora = dataHora;
        this.valor = valor;
        this.descricao = descricao;
        this.carteiraId = carteiraId;
    }
}