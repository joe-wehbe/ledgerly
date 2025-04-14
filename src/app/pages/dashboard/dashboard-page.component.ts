import { Component } from '@angular/core';
import { TransactionsComponent } from '../../components/general/transactions/transactions.component';
import { Account } from '../../models/account.model';
import { NotesService } from '../../services/notes.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TotalComponent } from '../../components/general/total/total.component';
import { StatisticsComponent } from '../../components/general/statistics/statistics.component';
import { AccountsComponent } from '../../components/general/accounts/accounts.component';
import { QuickTransferComponent } from '../../components/general/quick-transfer/quick-transfer.component';
import { AddNoteComponent } from '../../components/general/add-note/add-note.component';
import { SnackbarService } from '../../services/utility/snackbar.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    TotalComponent, 
    StatisticsComponent, 
    TransactionsComponent, 
    AccountsComponent, 
    QuickTransferComponent, 
    AddNoteComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  selectedAccount: Account | null = null;
  title: string = '';
  note: string = '';

  constructor (private notesService: NotesService, private snackBarService: SnackbarService) {}

  updateSelectedAccount(account: Account | null) {
    setTimeout(() => {
      this.selectedAccount = account;
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.notesService.addNote(this.title, this.note);
      this.snackBarService.success("Note added");
      form.reset();
    }
    else {
      this.snackBarService.warning("Invalid input");
    }
  }
}