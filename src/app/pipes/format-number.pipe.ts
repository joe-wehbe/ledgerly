import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number | undefined, currencySymbol: string = '$'): string {
    if (value === undefined || value === null) return '';
    let result: string;

    if (value >= 1_000_000_000_000_000) {
      result = value.toExponential(2).toUpperCase();
    } else if (value >= 1_000_000_000_000) {
      result = (value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    } else if (value >= 1_000_000_000) {
      result = (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (value >= 1_000_000) {
      result = (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      result = (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      result = value.toString();
    }

    return `${currencySymbol}${result}`;
  }
}
