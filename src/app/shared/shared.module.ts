import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService } from './services/shared.service';
import { BuildChartComponent } from './components/build-chart/build-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BuildChartComponent],
  providers:[SharedService],
  exports: [BuildChartComponent]
})
export class SharedModule { }
