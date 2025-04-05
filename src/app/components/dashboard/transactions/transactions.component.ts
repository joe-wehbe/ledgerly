import { Component, computed, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-transactions',
  imports: [RouterLink, DatePipe, CurrencyPipe, SlicePipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  isLoading = true;
  transactions = signal<Transaction[]>([]);
  selectedAccount = input.required<Account | null>();

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.transactions.set(this.transactionsService.getTransactions());
  }

  filteredTransactions = computed(() => {
    return this.transactions()
      .filter(transaction => 
        this.selectedAccount()?.id ? transaction.account.id === this.selectedAccount()?.id : true
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
  
}