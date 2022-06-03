export class RelatorioCarteiraMes{

	periodo: number = 0;
	receita: number = 0;
	despesa: number = 0;
	total: number = 0;

	constructor(periodo: number, receita: number, despesa: number , total: number) {
		this.periodo = periodo;
		this.receita = receita;
		this.despesa = despesa;
		this.total = total;
	}
	
}