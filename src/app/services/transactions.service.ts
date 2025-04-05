import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  accounts: Account[] = [];
  transcations: Transaction[] = [];

  constructor(private accountsService: AccountsService) { 
    this.accounts = this.accountsService.getAccounts();
    this.transcations = this.getTransactions();
  }

  deposit(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id === accountId);
    if (account) {
      if (!isTransfer) account.income += amount!;
      account.balance += amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));

      this.transcations.push({
        id: this.transcations.length > 0 ? Number(this.transcations[this.transcations.length-1].id) + 1 : 1,
        account: account,
        date: new Date(),
        amount: amount,
        type: 'income',
      });

      localStorage.setItem('transactions', JSON.stringify(this.transcations));
    }
  }

  withdraw(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id === accountId);
    if (account) {
      if (!isTransfer) account.expenses += amount!;
      account.balance -= amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));

      this.transcations.push({
        id: this.transcations[this.transcations.length-1].id + 1,
        account: account,
        date: new Date(),
        amount: amount,
        type: 'expense',
      });

      localStorage.setItem('transactions', JSON.stringify(this.transcations));
    }
  }

  transfer(amount: number | null, fromAccountId: number | null, toAccountId: number | null) {
    this.withdraw(amount!, fromAccountId!, true);
    this.deposit(amount!, toAccountId!, true)
  }

  getTransactions() {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  }
}
