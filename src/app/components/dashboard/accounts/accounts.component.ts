import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  isLoading = true;
  allSelected = false;
  accounts: Account[] = [];
  selectedId: number | null = null;
  isModalOpen = false;
  accountName: string = '';
  initialBalance: number = 0;

  @Output() selectedAccount = new EventEmitter<Account>();

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.accounts = this.accountsService.getAccounts();
    this.selectAll();
  }

  selectAccount(id: number): void {
    this.selectedId = id;
    this.allSelected = false;
    this.selectedAccount.emit(this.accounts.find(account => account.id === id));
  }

  selectAll() {
    if (!this.allSelected) {
      this.allSelected = true;
      this.selectedId = null;
      this.selectedAccount.emit(
        { 
          id: 0, 
          name: "All Accounts", 
          balance: this.accountsService.getTotalBalance(), 
          income: this.accountsService.getTotalIncome(), 
          expenses: this.accountsService.getTotalExpenses(),
        }
      )
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.accountsService.addAccount(this.accountName, this.initialBalance);
      form.reset();
      this.closeModal();
    }
  }
}