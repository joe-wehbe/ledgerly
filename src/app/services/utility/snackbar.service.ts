import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

  confirm(message: string, action: string): Observable<void> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['snackbar']
    });
    return snackBarRef.onAction();
  }
}
