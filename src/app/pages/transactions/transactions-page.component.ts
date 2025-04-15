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
  type: 'All' | 'Income' | 'Expenses' = 'All';
  searchQuery: string = '';

  sortByDate() {
    this.newest = !this.newest;
  }

  displayByType() {
    if (this.type === 'All') this.type = 'Income';
    else if (this.type === 'Income') this.type = 'Expenses'
    else if (this.type === 'Expenses') this.type = 'All';
  }

  cancelQuery() {
    this.searchQuery = '';
  }
}
