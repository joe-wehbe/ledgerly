import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions.service';
import { SnackbarService } from '../../../services/utility/snackbar.service';

@Component({
  selector: 'app-quick-transfer',
  imports: [FormsModule],
  templateUrl: './quick-transfer.component.html',
  styleUrl: './quick-transfer.component.css'
})
export class QuickTransferComponent implements OnInit{
  accounts: Account[] = [];
  fromAccountId: number | null = null;
  toAccountId: number | null = null;
  submittedAmount: number | null = null;

  constructor(
    private accountsService: AccountsService, 
    private transactionsService: TransactionsService,
    private snackBarService: SnackbarService,
  ) { }

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
    if (this.accounts.length > 0) {
      this.fromAccountId = this.accounts[0].id;
      this.toAccountId = this.accounts.length > 1 ? this.accounts[1].id : this.accounts[0].id;
    }
  }  

  onSubmit(form: any) {
    if (this.accounts.length < 2) {
      this.snackBarService.warning("Two or more accounts are required to transfer")
    }
    else {
      if (form.valid) {
        this.transactionsService.transfer(this.submittedAmount, this.fromAccountId, this.toAccountId);
        this.snackBarService.success("Transfer successful");
        form.reset();      
      } else {
        this.snackBarService.warning("Invalid input");
      }
    }
  }
}
