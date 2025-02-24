import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SideMenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
