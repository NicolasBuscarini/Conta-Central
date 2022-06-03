export class Deposito {

	id : number = 0
	dataHora: string = ""
	valor: number = 0
	descricao: string = ""
	externalName: string = ""
	externalId: string = ""
	carteiraId: string = ""

	constructor(id: number, dataHora: string, valor: number, descricao: string, externalId: string, externalName: string, carteiraId: string) {
		//specify your own constructor logic
		this.id = id;
		this.dataHora = dataHora;
		this.valor = valor;
		this.descricao = descricao;
		this.externalName = externalName;
		this.externalId = externalId;
		this.carteiraId = carteiraId;
	}
	
}