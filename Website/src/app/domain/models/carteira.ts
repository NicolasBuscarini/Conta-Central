export class Carteira{

	id : number = 0
	nome: string = ""
	saldo: number = 0
	userId: string = ""
	ativo: boolean = null
	principal:boolean = null

	constructor(id:number, nome: string, saldo: number, userId: string, ativo: boolean, principal: boolean) {
		//specify your own constructor logic
		this.id = id;
		this.nome = nome;
		this.saldo = saldo;
		this.userId = userId;
		this.ativo = ativo;
		this.principal = principal;
	}
	
}