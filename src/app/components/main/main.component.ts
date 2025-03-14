import { Component } from '@angular/core';
import { HeaderComponent } from "../structure/header/header.component";
import { SideMenuComponent } from "../structure/side-menu/side-menu.component";
import { FooterComponent } from '../structure/footer/footer.component';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterOutlet } from '@angular/router';

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

}