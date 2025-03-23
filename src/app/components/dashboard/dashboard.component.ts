import { Component } from '@angular/core';
import { TotalComponent } from './total/total.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountsComponent } from './accounts/accounts.component';
import { QuickTransferComponent } from './quick-transfer/quick-transfer.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    TotalComponent, 
    StatisticsComponent, 
    TransactionsComponent, 
    AccountsComponent, 
    QuickTransferComponent, 
    AddNoteComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedAccount: Account | null = null;

  updateSelectedAccount(account: Account | null) {
    setTimeout(() => {
      this.selectedAccount = account;
    });
  }
}