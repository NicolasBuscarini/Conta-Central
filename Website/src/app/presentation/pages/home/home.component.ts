import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { User } from 'src/app/domain/models/user';
import { Carteira } from 'src/app/domain/models/carteira';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
currentUser: User;
carteiras: Carteira[];

   constructor(private authService: AuthenticationService) {
      this.currentUser = authService.currentUser;
   }

  ngOnInit() {
  }

}
