import { RelatorioCarteiraMes } from "./relatorioCarteiraMes";

export class RelatorioCarteira{

	carteiraId : number = 0;
	tipo: number = 0;
    relatorioRecDespItems: RelatorioCarteiraMes[];

	constructor(carteiraId:number, tipo: number, relatorioRecDespItems: RelatorioCarteiraMes[]) {
		this.carteiraId = carteiraId;
		this.tipo = tipo;
		this.relatorioRecDespItems = relatorioRecDespItems;
	}
	
}