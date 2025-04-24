import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  getAccounts() {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
  }

  addAccount(name: string, balance: number | null) {  
    const accounts = this.getAccounts();
    const id = accounts.length > 0 ? accounts[accounts.length-1].id + 1 : 1;
    accounts.push({id: id, name: name, balance: balance === null ? 0 : balance, income: 0, expenses: 0, createdAt: new Date()});
    localStorage.setItem('accounts', JSON.stringify(accounts));  
  }

  deleteAccount(id: number | undefined) {
    const newAccounts = this.getAccounts().filter((account: Account) => account.id !== id);
    localStorage.setItem('accounts', JSON.stringify(newAccounts))
  }

  saveAccount(id: number | null, name: string, balance: number) {
    if (id === null) return;
  
    const accounts: Account[] = this.getAccounts();
    const index = accounts.findIndex(acc => acc.id === id);
  
    if (index !== -1) {
      accounts[index].name = name;
      accounts[index].balance = balance;
      localStorage.setItem('accounts', JSON.stringify(accounts));
    }
  }  

  getTotalBalance() {
    return this.getAccounts().reduce((sum: number, account: Account) => sum + account.balance, 0);
  }
  
  getTotalIncome() {
    return this.getAccounts().reduce((sum: number, account: Account) => sum + account.income, 0);
  }
  
  getTotalExpenses() {
    return this.getAccounts().reduce((sum: number, account: Account) => sum + account.expenses, 0);
  }
}