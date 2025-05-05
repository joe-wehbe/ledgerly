import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private accountsSubject = new BehaviorSubject<Account[]>(this.getAccountsFromStorage());
  accounts$ = this.accountsSubject.asObservable();

  private getAccountsFromStorage(): Account[] {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
  }

  getAccounts(): Account[] {
    return this.accountsSubject.value;
  }

  addAccount(name: string, balance: number | null) {
    const accounts = this.getAccounts();
    const id = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
    const newAccount = { id, name, balance: balance ?? 0, income: 0, expenses: 0, createdAt: new Date() };
    const updated = [...accounts, newAccount];
    localStorage.setItem('accounts', JSON.stringify(updated));
    this.accountsSubject.next(updated);
  }

  deleteAccount(id: number) {
    const updated = this.getAccounts().filter(account => account.id !== id);
    localStorage.setItem('accounts', JSON.stringify(updated));
    this.accountsSubject.next(updated);
  }

  saveAccount(id: number | null, name: string, balance: number) {
    if (id === null) return;
    const accounts = this.getAccounts().map(acc =>
      acc.id === id ? { ...acc, name, balance } : acc
    );
    localStorage.setItem('accounts', JSON.stringify(accounts));
    this.accountsSubject.next(accounts);
  }

  // Get totals
  getTotalBalance() {
    return this.getAccounts().reduce((sum, acc) => sum + acc.balance, 0);
  }
  getTotalIncome() {
    return this.getAccounts().reduce((sum, acc) => sum + acc.income, 0);
  }
  getTotalExpenses() {
    return this.getAccounts().reduce((sum, acc) => sum + acc.expenses, 0);
  }
}
