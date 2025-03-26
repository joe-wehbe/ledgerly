import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  accounts: Account[] = [];

  constructor(private accountsService: AccountsService) { 
    this.accounts = this.accountsService.getAccounts();
  }

  deposit(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id === accountId);
    if (account) {
      if (!isTransfer) account.income += amount!;
      account.balance += amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
  }

  withdraw(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id === accountId);
    if (account) {
      if (!isTransfer) account.expenses += amount!;
      account.balance -= amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }
  }

  transfer(amount: number | null, fromAccountId: number | null, toAccountId: number | null) {
    this.withdraw(amount!, fromAccountId!, true);
    this.deposit(amount!, toAccountId!, true)
  }

  getTransactions() {

  }
}
