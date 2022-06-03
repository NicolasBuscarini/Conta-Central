import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-links-shared',
  templateUrl: './side-bar-links-shared.component.html',
  styleUrls: ['./side-bar-links-shared.component.scss']
})
export class SideBarLinksSharedComponent implements OnInit {
  isTransferenciaCollapsed = true;
  isDepositoCollapsed = true;
  isSaqueCollapsed = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
