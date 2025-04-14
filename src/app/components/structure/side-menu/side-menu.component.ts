import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuToggleService } from '../../../services/utility/menu-toggle.service';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-menu',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  accounts: Account[] = []
  selectedAccountId: number | null = 0;

  constructor(private menuToggleService: MenuToggleService, private accountsService: AccountsService) {}

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts()
  }

  toggleSideMenu() {
    if (window.innerWidth < 1200) {
      this.menuToggleService.toggleMenu();
    }
  }
}