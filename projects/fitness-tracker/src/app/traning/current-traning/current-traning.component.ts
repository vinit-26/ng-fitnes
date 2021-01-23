import { TrainingService } from './../training.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-traning',
  templateUrl: './current-traning.component.html',
  styleUrls: ['./current-traning.component.css'],
})
export class CurrentTraningComponent implements OnInit {
  progress = 0;
  timer: any;
  @Output() public trainingExit = new EventEmitter<void>();
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.trainingExit.emit();
        this.trainingService.cancellExcersise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
  startOrResumeTimer(): void {
    const step =
      (this.trainingService.getRunningExcersise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExcersise();
        clearInterval(this.timer);
      }
    }, step);
  }
}
