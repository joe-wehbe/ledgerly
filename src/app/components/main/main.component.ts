import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { TotalComponent } from "../total/total.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SideMenuComponent, TotalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
