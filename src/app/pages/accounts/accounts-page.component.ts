import { Component, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Account } from '../../models/account.model';
import { AccountsService } from '../../services/accounts.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/utility/snackbar.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-accounts-page',
  imports: [FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './accounts-page.component.html',
  styleUrl: './accounts-page.component.css'
})
export class AccountsPageComponent {
  isLoading = true;
  accounts: Account[] = []
  newest = true;
  searchQuery = '';
  isModalOpen = false;
  accountName: string = '';
  initialBalance: number = 0;
  isEditModalOpen = false;
  editingAccountId: number | null = null;

  constructor(
    private accountsService: AccountsService, 
    private snackBarService: SnackbarService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.accounts = this.accountsService.getAccounts();
  }

  filteredAccounts() {
    const query = this.searchQuery.toLowerCase().trim();
    return this.accounts
      .filter(account => account.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return this.newest ? dateB - dateA : dateA - dateB;
      });
  }
  
  cancelQuery() {
    this.searchQuery = '';
  }

  sortByDate() {
    this.newest = !this.newest;
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

  openEditModal(id: number) {
    const account = this.accounts.find(a => a.id === id);
    if (account) {
      this.editingAccountId = id;
      this.accountName = account.name;
      this.initialBalance = account.balance;
      this.isEditModalOpen = true;
    }
  }
  
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingAccountId = null;
    this.accountName = '';
    this.initialBalance = 0;
  }

  onSave(form: any) {
    if (form.valid && this.editingAccountId !== null) {
      const formattedName = this.accountName.split(' ').filter(word => word.trim() !== '')
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  
      this.accountsService.saveAccount(this.editingAccountId, formattedName, this.initialBalance);
      this.accounts = this.accountsService.getAccounts();
      this.snackBarService.success("Account updated");
      this.closeEditModal();
      
    } else {
      this.snackBarService.warning("Invalid input");
    }
  }  

  deleteAccount(id: number) {
    this.snackBarService.confirm('Are you sure you want to delete this account and its transactions?', 'Delete')
    .subscribe(() => {
      this.accountsService.deleteAccount(id);
      this.transactionsService.deleteAccountTransactions(id);
      this.closeModal();
      this.accounts = this.accounts.filter(account => account.id !== id);
    });
  }
}