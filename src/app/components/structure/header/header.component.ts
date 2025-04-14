import { Component, OnInit } from '@angular/core';
import { MenuToggleService } from '../../../services/utility/menu-toggle.service';
import { Account } from '../../../models/account.model';
import { AccountsService } from '../../../services/accounts.service';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions.service';
import { SnackbarService } from '../../../services/utility/snackbar.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isDarkMode = localStorage.getItem('dark-theme') === 'enabled';
  isModalOpen = false;
  transactionType: 'Deposit' | 'Withdraw' | 'Transfer' = 'Deposit';
  accounts: Account[] = [];
  fromAccountId: number | null = null;
  toAccountId: number | null = null;
  submittedAmount: number | null = null;

  constructor(
    private menuToggleService: MenuToggleService, 
    private accountsService: AccountsService, 
    private transactionsService: TransactionsService,
    private snackBarService: SnackbarService) {
    this.applyTheme();
  }

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-theme', this.isDarkMode ? 'enabled' : 'disabled');
    this.applyTheme();
  }

  private applyTheme(): void {
    this.isDarkMode ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
  }

  toggleSideMenu(): void {
    this.menuToggleService.toggleMenu();
  }

  openModal(type: 'Deposit' | 'Withdraw' | 'Transfer') {
    if (this.accounts.length === 0 && type !== 'Transfer') {
      this.snackBarService.warning('Please add an account first');
    } 
    else if ((this.accounts.length === 0 || this.accounts.length === 1) && type === 'Transfer') {
      this.snackBarService.warning('Two or more accounts are required to transfer');
    }
    else {
      this.transactionType = type;
      this.isModalOpen = true;
  
      if (type === 'Deposit' || type === 'Withdraw') {
        this.toAccountId = this.accounts[0].id;
      } else {
        this.fromAccountId = this.accounts[0].id;
        this.toAccountId = this.accounts.length > 1 ? this.accounts[1].id : this.accounts[0].id;
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(form: any) {
    if (form.valid && this.submittedAmount! > 0) {
      if (this.transactionType === 'Deposit') {
        this.transactionsService.deposit(this.submittedAmount, this.toAccountId, false);
      } 
      else if (this.transactionType === 'Withdraw') {
        const account = this.accounts.find(account => account.id == this.toAccountId);
        if (account!.balance < this.submittedAmount!) {
          this.snackBarService.warning("Entered amount exceeds account balance!");
          return;
        }
        else {
          this.transactionsService.withdraw(this.submittedAmount, this.toAccountId, false);
        }
      } 
      else {
        if (this.fromAccountId == this.toAccountId) {
          this.snackBarService.warning("Cannot transfer from and to the same account");
          return;
        }
        else {
          const account = this.accounts.find(account => account.id == this.fromAccountId);
          if (account!.balance < this.submittedAmount!) {
            this.snackBarService.warning("Entered amount exceeds account balance!");
            return;
          }
          else {
            this.transactionsService.transfer(this.submittedAmount, this.fromAccountId, this.toAccountId);
          }
        }
      }
      this.snackBarService.success("Transaction successful");
      form.reset();   
      this.closeModal();   
    } 
    else {
      this.snackBarService.warning("Please enter the amount");
    }
  }
}