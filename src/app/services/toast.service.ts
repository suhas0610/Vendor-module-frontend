import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snack: MatSnackBar) {}

  success(message: string, duration = 2500) {
    this.snack.open(message, 'Close', { duration, panelClass: ['toast-success'] });
  }
  error(message: string, duration = 3500) {
    this.snack.open(message, 'Close', { duration, panelClass: ['toast-error'] });
  }
  info(message: string, duration = 2500) {
    this.snack.open(message, 'Close', { duration, panelClass: ['toast-info'] });
  }
}
