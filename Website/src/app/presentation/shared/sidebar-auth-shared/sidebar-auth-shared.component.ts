import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-auth-shared',
  templateUrl: './sidebar-auth-shared.component.html',
  styleUrls: ['./sidebar-auth-shared.component.scss']
})
export class SidebarAuthSharedComponent implements OnInit {
  isNavbarSideCollapsed = false;
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  windowResize() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 768 && this.isNavbarSideCollapsed === false) {
      this.isNavbarSideCollapsed = true;  
    } else if (windowWidth > 768 && this.isNavbarSideCollapsed) {
      this.isNavbarSideCollapsed = false;  
    }

  }
}
