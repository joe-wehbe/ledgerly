import { Component, input } from '@angular/core';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-total',
  imports: [CurrencyPipe],
  templateUrl: './total.component.html',
  styleUrl: './total.component.css'
})
export class TotalComponent {
  isLoading = true;
  selectedAccount = input.required<Account | null>();

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  } 
}