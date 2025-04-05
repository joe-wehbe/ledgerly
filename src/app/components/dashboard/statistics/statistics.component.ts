import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-statistics',
  imports: [NgxChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  standalone: true
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private transactionsService = inject(TransactionsService);

  isLoading = true;
  view: [number, number] = [1000, 360];
  data: any[] = [];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545']
  };

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
    const transactions = this.transactionsService.getTransactions() ?? [];

    const incomeMap = new Map<string, number>();
    const expenseMap = new Map<string, number>();

    for (const txn of transactions) {
      if (txn.amount == null) continue;

      const dateObj = txn.date instanceof Date ? txn.date : new Date(txn.date);
      const dateKey = dateObj.toISOString().split('T')[0];

      const map = txn.type === 'income' ? incomeMap : expenseMap;
      map.set(dateKey, (map.get(dateKey) || 0) + txn.amount);
    }

    const allDates: string[] = [];
    const today = new Date();

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

  formatXAxis = (value: string) => {
    const date = new Date(value);
    return date.getDate().toString();
  };
}
