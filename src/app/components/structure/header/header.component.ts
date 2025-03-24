import { Component } from '@angular/core';
import { MenuToggleService } from '../../../services/menu-toggle.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDarkMode = localStorage.getItem('dark-theme') === 'enabled';
  isModalOpen = false;
  transactionType: 'Deposit' | 'Withdraw' | 'Transfer' = 'Deposit';

  constructor(private menuToggleService: MenuToggleService) {
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

  toggleSideMenu(): void {
    this.menuToggleService.toggleMenu();
  }

  openModal(type: 'Deposit' | 'Withdraw' | 'Transfer') {
    this.transactionType = type;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
