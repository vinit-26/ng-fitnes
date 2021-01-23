import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `<h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content
      >You already got {{ data.progress }}%</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Yes
      </button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions> `,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { progress: number }) {}
}
