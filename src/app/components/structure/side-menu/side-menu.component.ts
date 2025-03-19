import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuToggleService } from '../../../services/menu-toggle/menu-toggle.service';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private menuToggleService: MenuToggleService) {}

  toggleSideMenu() {
    this.menuToggleService.toggleMenu();
  }
}