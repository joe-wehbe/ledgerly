import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { TransactionsPageComponent } from './pages/transactions/transactions-page.component';
import { AccountsPageComponent } from './pages/accounts/accounts-page.component';
import { NotesPageComponent } from './pages/notes/notes-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
  },
  {
    path: 'accounts',
    component: AccountsPageComponent,
  },
  {
    path: 'notes',
    component: NotesPageComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
