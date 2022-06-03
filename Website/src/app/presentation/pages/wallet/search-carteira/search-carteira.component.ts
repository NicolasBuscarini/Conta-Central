import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CarteiraDTO } from 'src/app/domain/models/DTO/carteiraDTO';
import { SearchDTO } from 'src/app/domain/models/DTO/searchDTO';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-search-carteira',
  templateUrl: './search-carteira.component.html',
  styleUrls: ['./search-carteira.component.scss']
})
export class SearchCarteiraComponent implements OnInit {

  public inputSearchString: string = "";
  private searchStringSubject: Subject<string>;
  private currentPage: number = 1;
  private pageSize: number = 10;

  public carteirasDTO: CarteiraDTO[] = [];
  public errorAlert: string;
  public warningAlert: string;
  
  constructor(
    private carteiraService: CarteiraService
  ) { 
    this.searchStringSubject = new Subject();
    this.searchStringSubject.pipe(debounceTime(750)).subscribe(() => { // debounceTime -> Timer para não realizar varias requisições enquanto digita rápido 
      this.limparResults();
      this.search();
    });
  }

  ngOnInit(): void {
    this.search();
  }

  async search() {
    try {
      let searchDTO: SearchDTO = new SearchDTO(this.inputSearchString, this.currentPage, this.pageSize);
      let resultSearch: CarteiraDTO[] = await this.carteiraService.searchCarteira(searchDTO).toPromise();
      this.carteirasDTO = this.carteirasDTO.concat(resultSearch);
      this.warningIfEmpty();
    }
    catch(error){
      this.errorAlert = error.error;
      console.log("Erro:", error.error);
    }

    //Com subscribe.
/*     this.carteiraService.searchCarteira(new SearchDTO(this.inputSearchString, this.currentPage, this.pageSize))
    .subscribe(
      ret => {
        this.carteirasDTO = this.carteirasDTO.concat(ret);
        this.warningIfEmpty();
      },
      error => {
        this.errorAlert = error.error;
        console.log(error.error);
      }
    );   */
  }

  limparResults(): void {
    this.carteirasDTO = [];
    this.currentPage  = 1;
    this.warningAlert = "";
    this.errorAlert   = "";
  }

  warningIfEmpty(): void {
    if (this.carteirasDTO.length == 0){
      this.warningAlert = "Nenhuma Carteira encontrada.";
    }
  }

  onScroll(): void {
    this.currentPage ++;
    this.search();
  } 

  onSearchChange(): void {
    this.searchStringSubject.next(this.inputSearchString);
  }

}
