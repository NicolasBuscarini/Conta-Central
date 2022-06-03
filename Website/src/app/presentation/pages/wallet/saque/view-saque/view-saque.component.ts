import { Component, OnInit } from '@angular/core';
import { Saque } from 'src/app/domain/models/saque';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { SaqueService } from 'src/app/domain/services/saque.service';

@Component({
  selector: 'app-view-saque',
  templateUrl: './view-saque.component.html',
  styleUrls: ['./view-saque.component.css']
})
export class ViewSaqueComponent implements OnInit {

  listaSaque: Saque[];
  saque: Saque;

  constructor(
    public authenticationService: AuthenticationService,
    public saqueService: SaqueService
  ) {
    this.saqueService.ListSaquesByCarteiraId(1).subscribe(x => {
      this.listaSaque = x;
    });
  }


  ngOnInit(): void {
  }

  getSaque(saqueId: number): void {
    this.saqueService.GetSaque(1).subscribe(a => {
      console.log("AAAQQQWWW", a);
      this.saque = a;
    });
  }

  ListaSaques(carteiraId: number) {
    this.saqueService.ListSaquesByCarteiraId(carteiraId).subscribe(a => {
      console.log("A", a)
      this.listaSaque = a;
    });
  }

  changeSaque(id: number) {
    this.saqueService.GetSaque(id).subscribe(a => {
      console.log("AAAQQQWWW", a);
      this.saque = a;
    });
  }

}


