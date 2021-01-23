import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraningComponent } from '../traning/traning.component';

const routes: Routes = [
  {
    path: '',
    component: TraningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
