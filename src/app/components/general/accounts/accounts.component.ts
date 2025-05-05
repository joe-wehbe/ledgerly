import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../services/utility/snackbar.service';

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
  initialBalance: number | null = null;

  @Output() selectedAccount = new EventEmitter<Account>();

  constructor(private accountsService: AccountsService, private snackBarService: SnackbarService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.accountsService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });
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
          createdAt: null,
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
      this.accountName = this.accountName.split(' ').filter(word => word.trim() !== '')
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  
      if (this.accountName != '') {
        for (let i = 0; i < this.accounts.length; i++) {
          if (this.accounts[i].name === this.accountName) {
            this.snackBarService.warning("An account with this name already exists");
            return;
          }
        }
  
        this.accountsService.addAccount(this.accountName, this.initialBalance);
        this.accounts = this.accountsService.getAccounts();
        this.snackBarService.success("Account added");
        form.reset();
        this.closeModal();
      }
    } else {
      this.snackBarService.warning("Invalid input");
    }
  }
}