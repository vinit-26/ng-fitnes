import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CurrentTraningComponent } from './current-traning/current-traning.component';
import { NewTraningComponent } from './new-traning/new-traning.component';
import { PastsTraningComponent } from './pasts-traning/pasts-traning.component';
import { TraningComponent } from './traning.component';
import { StopTrainingComponent } from './current-traning/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TraningComponent,
    CurrentTraningComponent,
    NewTraningComponent,
    PastsTraningComponent,
    StopTrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule],
})
export class TrainingModule {}
