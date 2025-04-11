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
  searchQuery: string = '';

  sortByDate() {
    this.newest = !this.newest;
  }

  cancelQuery() {
    this.searchQuery = '';
  }
}
