import { Component, input } from '@angular/core';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';
import { FormatNumberPipe } from '../../../pipes/format-number.pipe';

@Component({
  selector: 'app-total',
  imports: [FormatNumberPipe],
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