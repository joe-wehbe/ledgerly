import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { AccountsComponent } from './components/dashboard/accounts/accounts.component';
import { AddNoteComponent } from './components/dashboard/add-note/add-note.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  // {
  //   path: 'notes',
  //   component: NotesComponent,
  // },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
