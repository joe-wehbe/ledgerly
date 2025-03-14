import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/structure/header/header.component';
import { SideMenuComponent } from "./components/structure/side-menu/side-menu.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}