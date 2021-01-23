import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TrainingService } from './../training.service';
import { Excersise } from './../excersise.modal';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs-compat/operator/filter';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pasts-traning',
  templateUrl: './pasts-traning.component.html',
  styleUrls: ['./pasts-traning.component.css'],
})
export class PastsTraningComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Excersise>();
  displayColumns = ['date', 'name', 'calories', 'duration', 'state'];
  inputValue = '';
  pageSizeOption = [1, 5, 10, 25, 100];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.finishedExcersisesChanges.subscribe(
      (excersise: Excersise[]) => {
        this.dataSource.data = excersise;
      }
    );
    this.trainingService.fetchCompletedOrCencelledExcersises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onFilter(): void {
    this.dataSource.filter = this.inputValue.trim().toLowerCase();
  }
}
