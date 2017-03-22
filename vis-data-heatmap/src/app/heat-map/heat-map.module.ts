import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatMapService } from './heat-map.service';
import { HeatMapComponent } from './heat-map.component/heat-map.component';
import { LegendService } from 'app/heat-map/legend.service';
import { TooltipComponent } from './tooltip/tooltip.component';
import { MoveDirective } from './move.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    HeatMapComponent,
    TooltipComponent,
    MoveDirective
  ],
  providers: [
    HeatMapService,
    LegendService
  ],
  exports: [ HeatMapComponent ]
})
export class HeatMapModule { }
