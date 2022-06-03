import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-header-auth-shared',
  templateUrl: './header-auth-shared.component.html',
  styleUrls: ['./header-auth-shared.component.scss']
})
export class HeaderAuthSharedComponent implements OnInit {
  
  public isNavbarTopCollapsed = true;
  public listCarteira: Carteira[];
  public selectedCarteira: Carteira;
  
  constructor(
    private authService: AuthenticationService, 
    private carteiraService: CarteiraService,
  ) { }

  ngOnInit(): void {
    this.carteiraService.listMinhasCarteiras().subscribe(x => {
			this.listCarteira = x;
		});
    this.selectedCarteira = this.carteiraService.selectedCarteira;
  }

  windowResize() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 768 && this.isNavbarTopCollapsed === false) {
      this.isNavbarTopCollapsed = true;
    } else if (windowWidth > 768 && this.isNavbarTopCollapsed) {
      this.isNavbarTopCollapsed = false;
    }
  }

  logout() {
    this.authService.reset();
    this.carteiraService.reset();
  }

  setSelectedCarteira(carteiraId: number){
    this.carteiraService.getCarteira(carteiraId).subscribe(ret =>{
      this.carteiraService.setSelectedCarteira(ret);
      this.selectedCarteira = ret;
    });
  }

}
