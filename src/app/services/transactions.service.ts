import { Injectable } from '@angular/core';
import { AccountsService } from './accounts.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  accounts: Account[] = [];
  transactions: Transaction[] = [];

  constructor(private accountsService: AccountsService) { 
    this.accounts = this.accountsService.getAccounts();
    this.transactions = this.getTransactions();
  }

  deposit(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id == accountId);
    if (account) {
      if (!isTransfer) account.income += amount!;
      account.balance += amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));

      this.transactions.push({
        id: this.transactions.length > 0 ? this.transactions[this.transactions.length-1].id + 1 : 1,
        account: account,
        date: new Date(),
        amount: amount,
        type: 'income',
      });

      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
  }

  withdraw(amount: number | null, accountId: number | null, isTransfer: boolean) {
    const account = this.accounts.find(account => account.id == accountId);
    if (account) {
      if (!isTransfer) account.expenses += amount!;
      account.balance -= amount!;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));

      this.transactions.push({
        id: this.transactions[this.transactions.length-1].id + 1,
        account: account,
        date: new Date(),
        amount: amount,
        type: 'expense',
      });

      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
  }

  transfer(amount: number | null, fromAccountId: number | null, toAccountId: number | null) {
    this.withdraw(amount!, fromAccountId!, true);
    this.deposit(amount!, toAccountId!, true)
  }

  getTransactions() {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  }

  filterTransactions(searchQuery: string, type: 'All' | 'Income' | 'Expense', newest: boolean): Transaction[] {
    const query = searchQuery.toLowerCase();
    let filtered: Transaction[] = this.transactions;

    if (query.trim() !== '') {
      filtered = filtered.filter(transaction => {
        const accountMatch = transaction.account.name.toLowerCase().includes(query);
        const dateMatch = new Date(transaction.date).toLocaleDateString().toLowerCase().includes(query);
        const timeMatch = new Date(transaction.date).toLocaleTimeString().toLowerCase().includes(query);
        return accountMatch || dateMatch || timeMatch;
      });
    }

    if (type !== 'All') {
      filtered = filtered.filter(t => t.type.toLowerCase() === type.toLowerCase());
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return newest ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }
}
