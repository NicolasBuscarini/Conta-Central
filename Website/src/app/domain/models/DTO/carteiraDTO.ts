export class CarteiraDTO{

	id : number = 0
	nome: string = ""
	userId: string = ""
	userName: string = ""

	constructor(id:number, nome: string, userId: string) {
		this.id = id;
		this.nome = nome;
		this.userId = userId
	}
	
}