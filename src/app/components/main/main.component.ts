import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { TotalComponent } from "../dashboard/total/total.component";
import { StatisticsComponent } from "../dashboard/statistics/statistics.component";
import { TransactionsComponent } from "../dashboard/transactions/transactions.component";
import { AccountsComponent } from "../dashboard/accounts/accounts.component";
import { QuickTransferComponent } from "../dashboard/quick-transfer/quick-transfer.component";
import { AddNoteComponent } from "../dashboard/add-note/add-note.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SideMenuComponent, TotalComponent, StatisticsComponent, TransactionsComponent, AccountsComponent, QuickTransferComponent, AddNoteComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}