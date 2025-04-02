import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [RouterLink, DatePipe, CurrencyPipe, SlicePipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  isLoading = true;
  transactions: Transaction[] = [];

  constructor (private transactionsService: TransactionsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.transactions = this.transactionsService.getTransactions();
    this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}