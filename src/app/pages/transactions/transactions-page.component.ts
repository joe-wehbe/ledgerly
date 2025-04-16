import { Component } from '@angular/core';
import { TransactionsComponent } from "../../components/general/transactions/transactions.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-page',
  imports: [FormsModule, TransactionsComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {
  newest = true;
  type: 'All' | 'Income' | 'Expense' = 'All';
  searchQuery: string = '';

  cancelQuery() {
    this.searchQuery = '';
  }

  sortByDate() {
    this.newest = !this.newest;
  }

  displayByType() {
    if (this.type === 'All') this.type = 'Income';
    else if (this.type === 'Income') this.type = 'Expense'
    else if (this.type === 'Expense') this.type = 'All';
  }
}