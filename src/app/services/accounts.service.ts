import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { 
  }

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

  }

  getTotalIncome() {

  }

  getTotalExpenses() {

  }
}
