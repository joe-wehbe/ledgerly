import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  isLoading = true;
  accounts: Account[] = [];
  selectedId: number | null = null;
  allSelected = true;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.accounts = this.accountsService.getAccounts();
  }

  selectAccount(id: number): void {
    this.selectedId = id;
    this.allSelected = false
  }

  selectAll() {
    this.allSelected = !this.allSelected;
    if (!this.allSelected && this.accounts.length > 0) {
      this.selectedId = this.accounts[0].id;
    } else {
      this.selectedId = null;
    }
  }
  
}