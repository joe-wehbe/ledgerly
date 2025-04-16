import { Component, computed, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Account } from '../../../models/account.model';

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

    this.transactions.set(this.transactionsService.getTransactions());
  }

  filteredTransactions = computed(() => {
    return this.transactionsService.filterTransactions(this.searchQuery(), this.type(), this.newest());
  });
}