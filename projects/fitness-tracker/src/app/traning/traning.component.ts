import { Excersise } from './excersise.modal';
import { TrainingService } from './training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traning',
  templateUrl: './traning.component.html',
  styleUrls: ['./traning.component.css'],
})
export class TraningComponent implements OnInit {
  ongoingTraining = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.excersiseChanged.subscribe((excersise: Excersise) => {
      if (excersise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }
}
