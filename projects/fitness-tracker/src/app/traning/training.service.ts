import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Excersise } from './excersise.modal';
import { UIService } from './../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  excersiseChanged = new Subject<Excersise>();
  excersisesChanged = new Subject<Excersise[] | null>();
  finishedExcersisesChanges = new Subject<Excersise[]>();
  private availableExcersise: Excersise[] = [];
  private runningExcersise!: Excersise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExcersise(): void {
    this.fbSubs.push(
      this.db
        .collection('availableExcersises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              const data = doc.payload.doc.data() as Excersise;
              return {
                id: doc.payload.doc.id,
                name: data.name,
                duration: data.duration,
                calories: data.calories,
              };
            });
          })
        )
        .subscribe(
          (result: Excersise[]) => {
            this.availableExcersise = result;
            this.excersisesChanged.next([...result]);
          },
          (error) => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(
              'Fetching Excersise failed, Try again.!',
              undefined,
              3000
            );
            this.excersisesChanged.next(null);
          }
        )
    );
    // return this.availableExcersise.slice();
  }
  startExcersise(selectedExId: string): void {
    const selectedExcersise = this.availableExcersise.find(
      (ex) => ex.id === selectedExId
    );
    if (selectedExcersise) {
      this.runningExcersise = selectedExcersise;
    }
    this.excersiseChanged.next({ ...this.runningExcersise });
  }
  completeExcersise(): void {
    this.addDataToDatabase({
      ...this.runningExcersise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExcersise = (null as unknown) as Excersise;
    this.excersiseChanged.next(this.runningExcersise);
  }
  cancellExcersise(progress: number): void {
    this.addDataToDatabase({
      ...this.runningExcersise,
      calories: this.runningExcersise.duration * (progress / 100),
      duration: this.runningExcersise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExcersise = (null as unknown) as Excersise;
    this.excersiseChanged.next(this.runningExcersise);
  }
  getRunningExcersise(): Excersise {
    return { ...this.runningExcersise };
  }
  fetchCompletedOrCencelledExcersises(): void {
    this.fbSubs.push(
      this.db
        .collection('finishedExcersises')
        .valueChanges()
        .subscribe((exersises) => {
          this.finishedExcersisesChanges.next(exersises as Excersise[]);
        })
    );
  }
  private addDataToDatabase(excersise: Excersise): void {
    this.db.collection('finishedExcersises').add(excersise);
  }
  cancelSubscription(): void {
    this.fbSubs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
