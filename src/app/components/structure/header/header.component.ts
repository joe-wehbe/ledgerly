import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from '../../../services/menu-toggle.service';
import { Account } from '../../../models/account.model';
import { AccountsService } from '../../../services/accounts.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isDarkMode = localStorage.getItem('dark-theme') === 'enabled';
  isModalOpen = false;
  transactionType: 'Deposit' | 'Withdraw' | 'Transfer' = 'Deposit';
  accounts: Account[] = [];

  constructor(private menuToggleService: MenuToggleService, private accountsService: AccountsService) {
    this.applyTheme();
  }

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
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
