import { Component, OnInit } from '@angular/core';
import { Carteira } from 'src/app/domain/models/carteira';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-menu-mobile-shared',
  templateUrl: './menu-mobile-shared.component.html',
  styleUrls: ['./menu-mobile-shared.component.scss']
})
export class MenuMobileSharedComponent implements OnInit {

  selectedCarteira: Carteira;
  listCarteira: Carteira[];
  isCollapsed = true;

  constructor(private authService: AuthenticationService, private carteiraService: CarteiraService) { }

  ngOnInit(): void {
    this.carteiraService.listMinhasCarteiras().subscribe(x => {
			this.listCarteira = x;
		});
    this.selectedCarteira = this.carteiraService.selectedCarteira;
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
