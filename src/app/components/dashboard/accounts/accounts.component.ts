import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-accounts',
  imports: [RouterLink],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  isLoading = true;
  accounts: Account[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.accounts = this.accountsService.getAccounts(); 
  }
}
