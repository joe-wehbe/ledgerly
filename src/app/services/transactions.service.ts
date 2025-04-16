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
    const query = searchQuery.toLowerCase().trim();
  
    let filtered = this.transactions.filter(transaction => {
      const dateObj = new Date(transaction.date);
      const dateStr = transaction.date instanceof Date ? transaction.date.toISOString().split('T')[0] : transaction.date;
      const fullMonthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj).toLowerCase();
      const shortMonthFormat = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric', year: 'numeric'}).format(dateObj).toLowerCase();
      const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).format(dateObj).toLowerCase();
  
      return (
        transaction.account.name.toLowerCase().includes(query) ||
        dateStr.includes(query) ||
        fullMonthFormat.includes(query) ||
        shortMonthFormat.includes(query) ||
        timeFormat.includes(query)
      );
    });
  
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
