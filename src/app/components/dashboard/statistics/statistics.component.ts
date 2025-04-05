import { Component, OnInit, OnDestroy, inject, input, effect } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-statistics',
  imports: [NgxChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  standalone: true
})
export class StatisticsComponent implements OnInit, OnDestroy {
  transactionsService = inject(TransactionsService);
  selectedAccount = input.required<Account | null>();
  lastDate = new Date();
  firstDate = new Date().setDate(this.lastDate.getDay() - 30);
  isLoading = true;
  view: [number, number] = [1000, 360];
  data: any[] = [];

  effect = effect(() => {
    this.fetchData();
  });

  ngOnInit() {
    this.fetchData();

    setTimeout(() => {
      this.isLoading = false;
      this.updateChartSize();
      window.addEventListener('resize', this.updateChartSize.bind(this));
    }, 500);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateChartSize.bind(this));
  }

  updateChartSize() {
    const parentWidth = document.querySelector('.chart-container')?.clientWidth || 1000;
    this.view = [parentWidth, 360];
  }

  fetchData() {
    let transactions = this.transactionsService.getTransactions() ?? [];
    let filteredTransactions = transactions;
    const incomeMap = new Map<string, number>();
    const expenseMap = new Map<string, number>();
    const allDates: string[] = [];
    const today = new Date();

    if (this.selectedAccount()?.id !== 0) {
      filteredTransactions = transactions.filter((txn: Transaction) => txn.account.id === this.selectedAccount()?.id)
    }
    
    for (const txn of filteredTransactions) {
      if (txn.amount == null) continue;
      const dateObj = txn.date instanceof Date ? txn.date : new Date(txn.date);
      const dateKey = dateObj.toISOString().split('T')[0];
      const map = txn.type === 'income' ? incomeMap : expenseMap;
      map.set(dateKey, (map.get(dateKey) || 0) + txn.amount);
    }

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      allDates.push(date.toISOString().split('T')[0]);
    }

    this.data = [
      {
        name: 'Income',
        series: allDates.map(date => ({
          name: date,
          value: incomeMap.get(date) || 0
        }))
      },
      {
        name: 'Expenses',
        series: allDates.map(date => ({
          name: date,
          value: expenseMap.get(date) || 0
        }))
      }
    ];
  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545', 'AFAFAF']
  };

  formatXAxis = (value: string) => {
    const date = new Date(value);
    return date.getDate().toString();
  };
}
