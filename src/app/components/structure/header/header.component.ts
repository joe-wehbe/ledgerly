import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkMode = localStorage.getItem('dark-theme') === 'enabled';

  constructor() {
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-theme', this.isDarkMode ? 'enabled' : 'disabled');
    this.applyTheme();
  }

  private applyTheme(): void {
    this.isDarkMode ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
  }
}