import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string = 'Dismiss') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar']
    });
  }

  warning(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar']
    });
  }
}
