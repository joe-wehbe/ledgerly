import { Component, computed, OnInit, signal } from '@angular/core';
import { TransactionsComponent } from "../../components/general/transactions/transactions.component";
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions-page',
  imports: [FormsModule, TransactionsComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {
  newest = signal(true);
  type = signal<'All' | 'Income' | 'Expense'>('All');
  searchQuery = signal('');

  constructor(private transactionsService: TransactionsService) {}

  count = computed(() => this.filteredTransactions().length);
  filteredTransactions = computed(() => {
    return this.transactionsService.filterTransactions(this.searchQuery(), this.type(), this.newest());
  });

  cancelQuery() {
    this.searchQuery.set('');
  }

  sortByDate() {
    this.newest.update(v => !v);
  }

  displayByType() {
    this.type.set(
      this.type() === 'All' ? 'Income' : this.type() === 'Income' ? 'Expense' : 'All'
    );
  }
}