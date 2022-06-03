import { Component, OnInit } from '@angular/core';
import { RelatorioCarteira } from 'src/app/domain/models/relatorioCarteira';
import { RelatorioService } from 'src/app/domain/services/relatorio.service';
import { LOCALE_ID } from '@angular/core';
import { CarteiraService } from 'src/app/domain/services/carteira.service';
import { Carteira } from 'src/app/domain/models/carteira';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
relatorios: RelatorioCarteira[];
totais: number[];
carteiras: Carteira[];
relatorioAnosDisponiveis: number[];
anosDisponiveisToCreateRelatorio: number[];
loading = false;

  constructor(private relatorioService: RelatorioService, private carteiraService: CarteiraService) { }

  ngOnInit(): void {
    this.carteiraService.listMinhasCarteiras().subscribe(carteiras => {
      this.carteiras = carteiras;
    });
    this.relatorioService.ListAnosDisponiveisToCreateRelatorio().subscribe(anos => {
      this.anosDisponiveisToCreateRelatorio = anos;
    })
    this.updateData();
  }

  updateData(){
    this.relatorioService.ListRelatorioAnosDisponiveis().subscribe(anos => {
      this.relatorioAnosDisponiveis = anos;
    })
  }

  GerarRelatorioByUser(ano: number) {
    this.relatorioService.GerarRelatorioByUser(ano).subscribe(ret => {
      this.updateData();
      this.loading = false;
    });
    this.loading = true;
	}

  GetRelatorioByUser(ano: number) {
    this.relatorioService.GetRelatorioByUser(ano).subscribe(ret => {
      this.totais = this.relatorioService.SomaTotais(ret);
      this.relatorios = ret;
    });
	}

  GetNomeMesByNumber(mes: number){
    switch (mes){
      case 0: return "Janeiro";
      case 1: return "Fevereiro";
      case 2: return "Março";
      case 3: return "Abril";
      case 4: return "Maio";
      case 5: return "Junho";
      case 6: return "Julho";
      case 7: return "Agosto";
      case 8: return "Setembro";
      case 9: return "Outubro";
      case 10: return "Novembro";
      case 11: return "Dezembro";
    }
  }

  GetCarteiraById(carteiraId: number){
    let findCarteira: String;
    this.carteiras.forEach(carteira => {
      if(carteira.id == carteiraId){
        findCarteira = carteira.nome;
        return;
      }
    });
    
    return findCarteira;
  }
}
