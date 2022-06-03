import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carteira } from 'src/app/domain/models/carteira';
import { User } from 'src/app/domain/models/user';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-select-carteira',
  templateUrl: './select-carteira.component.html',
  styleUrls: ['./select-carteira.component.scss']
})
export class SelectCarteiraComponent implements OnInit {
  selectedCarteira: Carteira;
  currentUser: User;
  carteiras: Carteira[];
  toggled = false;
  
  constructor(private carteiraService: CarteiraService, private router: Router, private authService: AuthenticationService) {
    this.selectedCarteira = carteiraService.selectedCarteira;
  }

  ngOnInit(){
      this.carteiraService.listMinhasCarteiras().subscribe(carteiras => {
        this.carteiras = carteiras;
      });
      if(this.selectedCarteira){
        this.router.navigate(['wallet']);
      }
  }

  setSelectedCarteira(id: number){
    this.carteiraService.getCarteira(id).subscribe(carteira => {
      this.carteiraService.setSelectedCarteira(carteira);
      this.router.navigate(['wallet']);
    });
  }

  logout() {
    this.authService.reset();
    this.carteiraService.reset();
  }
}
