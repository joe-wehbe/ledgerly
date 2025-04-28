import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuToggleService } from '../../../services/utility/menu-toggle.service';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account.model';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SnackbarService } from '../../../services/utility/snackbar.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-side-menu',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  accounts: Account[] = []
  selectedAccountId: number | null = 0;
  isDownloadModalOpen = false;
  // selectedAccount: 'All accounts' | Account | null = 'All accounts';
  selectedType: 'all' | 'income' | 'expense' = 'all'
  startDate: string = '';
  endDate: string = '';

  constructor(
    private menuToggleService: MenuToggleService, 
    private accountsService: AccountsService, 
    private transactionsService:TransactionsService,
    private snackBarService:SnackbarService
  ) {}

  ngOnInit() {
    this.accounts = this.accountsService.getAccounts();
  }

  toggleSideMenu() {
    if (window.innerWidth < 1200) {
      this.menuToggleService.toggleMenu();
    }
  }

  openDownloadModal() {
    this.isDownloadModalOpen = true;
  }

  closeDownloadModal() {
    this.isDownloadModalOpen = false;
  }

  private formatDate(dateStr: string): string {
    if (dateStr.toLowerCase() === 'today') return 'Today';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  onSubmit(form: any) {
    if (form.valid) {
      let transactions = this.transactionsService.getTransactions();

      if (this.selectedAccountId !== 0) {
        transactions = transactions.filter((transaction: Transaction) => transaction.account.id == this.selectedAccountId);
      }

      if (this.selectedType !== 'all') {
        transactions = transactions.filter((transaction: Transaction) => transaction.type === this.selectedType);
      }

      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.snackBarService.warning("End date cannot be less than start date");
          return;
        }
        transactions = transactions.filter((transaction: Transaction) => new Date(transaction.date) >= new Date(this.startDate));
        transactions = transactions.filter((transaction: Transaction) => new Date(transaction.date) <= new Date(this.endDate));
      }
      else if (this.startDate && !this.endDate) {
        transactions = transactions.filter((transaction: Transaction) => new Date(transaction.date) >= new Date(this.startDate));
        this.endDate = 'Today';
      }
      else if (!this.startDate && this.endDate) {
        transactions = transactions.filter((transaction: Transaction) => new Date(transaction.date) <= new Date(this.endDate));
        this.startDate = transactions[0].date;
      }
      else {
        this.startDate = transactions[0].date;
        this.endDate = 'Today';
      }

      if (transactions.length === 0) {
        this.snackBarService.warning("No transactions found that match your input");
        return;
      }

      const doc = new jsPDF();

      doc.setFontSize(15);
      doc.text('Ledgerly', 6, 10);

      doc.setFontSize(12);
      const currentDate = new Date().toLocaleDateString();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      const dateTextWidth = doc.getTextWidth(currentDate);
      const dateX = pageWidth - dateTextWidth - 6;
      doc.setTextColor(150, 150, 150);
      doc.text(currentDate, dateX, 10);
    
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      const title = 'Transaction Report';
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(title, titleX, 20);

      doc.setFontSize(11);
      const account = this.accounts.find(account => account.id == this.selectedAccountId);
      const accountText = this.selectedAccountId === 0 ? 'All Accounts' : account?.name;
      const formattedStartDate = this.formatDate(this.startDate);
      const formattedEndDate = this.endDate !== 'Today' ? this.formatDate(this.endDate) : 'Today';
      const dateRangeText = `${formattedStartDate} till ${formattedEndDate}`;
      const transactionTypeText = `${this.selectedType == 'all' ? 'Income & Expenses' : this.selectedType.charAt(0).toUpperCase() + this.selectedType.slice(1)}`;
      const filterText = `${accountText} | ${dateRangeText} | ${transactionTypeText}`;
      const filterWidth = doc.getTextWidth(filterText);
      const filterX = (pageWidth - filterWidth) / 2;
      doc.text(filterText, filterX, 27);

      const rows = transactions.map((t: any) => {
        const dateObj = new Date(t.date);
        const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return [t.account.name, date, time, '$' + t.amount, t.type.charAt(0).toUpperCase() + t.type.slice(1)];
      });

      autoTable(doc, {
        startY: 35,
        head: [['Account', 'Date', 'Time', 'Amount', 'Type']],
        body: rows,
        headStyles: {
          fillColor: [40, 167, 69],
          textColor: [255, 255, 255],
          halign: 'center',
          fontSize: 12
        },
        bodyStyles: {
          fontSize: 10,
          halign: 'center',
          valign: 'middle',
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        margin: { top: 30 },
        tableWidth: 'auto',
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 },
        }
      });

      doc.save('transactions.pdf');
      this.closeDownloadModal();
    }
  }
}