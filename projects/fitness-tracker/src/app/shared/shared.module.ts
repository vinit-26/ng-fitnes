import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialsModule } from '../ng-materials/materials.module';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialsModule, FlexLayoutModule],
})
export class SharedModule {}
