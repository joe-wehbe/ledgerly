import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from "../structure/header/header.component";
import { SideMenuComponent } from "../structure/side-menu/side-menu.component";
import { FooterComponent } from '../structure/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MenuToggleService } from '../../services/utility/menu-toggle.service';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  screenWidth: number = 0;
  isMenuVisible: boolean = false;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.isMenuVisible = this.screenWidth >= 1200 ? true : false;
  }

  constructor(private menuToggleService: MenuToggleService) {
    this.menuToggleService.menuVisible$.subscribe((isVisible) => {
      this.isMenuVisible = isVisible;
    });    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1200) {
      this.isMenuVisible = true;
    } else {
     this.isMenuVisible = false;
     this.menuToggleService.closeMenu();
    }
  }
}