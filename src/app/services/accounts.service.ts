import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  getAccounts() {
    const accounts = localStorage.getItem('accounts');
    return accounts ? JSON.parse(accounts) : [];
  }

  addAccount(account: Account) {  
    localStorage.setItem('accounts', this.getAccounts().push(account));
  }

  deleteAccount() {

  }

  getAccountBalance() {

  }

  getAccountIncome() {

  }

  getAccountExpenses() {

  }

  getTotalBalance() {
    let totalBalance = 0;
    let accounts = this.getAccounts();

    for (let i = 0; i < accounts.length; i++) {
      totalBalance += accounts[i].balance;
    }

    return totalBalance;
  }

  getTotalIncome() {
    let totalIncome = 0;
    let accounts = this.getAccounts();

    for (let i = 0; i < accounts.length; i++) {
      totalIncome += accounts[i].income;
    }

    return totalIncome;
  }

  getTotalExpenses() {
    let totalExpenses = 0;
    let accounts = this.getAccounts();

    for (let i = 0; i < accounts.length; i++) {
      totalExpenses += accounts[i].expenses;
    }

    return totalExpenses;
  }
}