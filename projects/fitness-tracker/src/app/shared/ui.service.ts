import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(
    message: string,
    action: string | undefined,
    timeout: number
  ): void {
    this.snackBar.open(message, action, {
      duration: timeout,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'redClass',
    });
  }
}
