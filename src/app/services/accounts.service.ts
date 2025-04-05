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
    const id = accounts.length > 0 ? Number(accounts[accounts.length-1].id) + 1 : 1;
    accounts.push({id: id, name: name, balance: balance, income: 0, expenses: 0});
    localStorage.setItem('accounts', JSON.stringify(accounts));  
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