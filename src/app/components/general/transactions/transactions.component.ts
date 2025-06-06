import { Component, computed, input, OnInit, signal } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';
import { Account } from '../../../models/account.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  isLoading = true;
  transactions = signal<Transaction[]>([]);

  selectedAccount = input.required<Account | null>();
  parentComponent = input.required<'Dashboard' | 'Transactions'>();
  searchQuery = input.required<string>();
  type = input.required<'All' | 'Income' | 'Expense'>();
  newest = input.required<boolean>();

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.transactionsService.transactions$.subscribe(transactions => {
      this.transactions.set(transactions);
    });
  }

  filteredTransactions = computed(() => {
    if (this.parentComponent() === 'Dashboard') {
      return this.transactions()
        .filter(transaction => this.selectedAccount()?.id ? transaction.account.id === this.selectedAccount()?.id : true)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6);
    }
    return this.transactionsService.filterTransactions(this.searchQuery(), this.type(), this.newest());
  });
}