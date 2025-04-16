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
    if (this.parentComponent() === 'Dashboard') {
      const filtered = this.transactions()
      .filter(transaction => this.selectedAccount()?.id ? transaction.account.id === this.selectedAccount()?.id : true)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return filtered.slice(0, 6);
    } 
    else {
      const query = this.searchQuery().toLowerCase();
      const type = this.type();
      const sortNewest = this.newest();
      let filtered = this.transactions();
    
      if (query.trim() !== '') {
        filtered = filtered.filter(transaction => {
          const accountMatch = transaction.account.name.toLowerCase().includes(query);
          const dateMatch = new Date(transaction.date).toLocaleDateString().toLowerCase().includes(query);
          const timeMatch = new Date(transaction.date).toLocaleTimeString().toLowerCase().includes(query);
          return accountMatch || dateMatch || timeMatch;
        });
      }
    
      if (type !== 'All') {
        filtered = filtered.filter(t => t.type.toLowerCase() === type.toLowerCase());
      }
    
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortNewest ? dateB - dateA : dateA - dateB;
      });
    
      return filtered;
    }
  });  
}