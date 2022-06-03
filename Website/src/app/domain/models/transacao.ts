export class Transacao{
    id:number
    valor: number
    dataHora: string
    descricao: string
    origemTipo : number
    origemId : number
    carteiraId : number

    constructor(id:number, valor: number,dataHora: string, descricao: string,  origemTipo : number, origemId : number, carteiraId : number) {
        //specify your own constructor logic
        this.id = id;
        this.valor = valor;
        this.dataHora = dataHora;
        this.descricao = descricao;
        this.origemTipo = origemTipo;
        this.origemId = origemId;
        this.carteiraId = carteiraId;
    }
}

