import { NgForm } from '@angular/forms';
import { Excersise } from '../excersise.modal';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-new-traning',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css'],
})
export class NewTraningComponent implements OnInit {
  excersises: Excersise[] | null = [];
  isLoading = false;

  constructor(private trainingService: TrainingService) {}
  ngOnInit(): void {
    // this.excersises = this.trainingService.getAvailableExcersise();
    this.isLoading = true;
    this.trainingService.excersisesChanged.subscribe((excersises) => {
      this.excersises = excersises;
      this.isLoading = false;
    });
    this.fetchExcersises();
  }
  fetchExcersises(): void {
    this.trainingService.fetchAvailableExcersise();
  }
  onStartTraining(form: NgForm): void {
    this.trainingService.startExcersise(form.value.excersise);
  }
}
