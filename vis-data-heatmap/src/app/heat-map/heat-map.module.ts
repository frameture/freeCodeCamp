import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatMapService } from './heat-map.service';
import { HeatMapComponent } from './heat-map.component/heat-map.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    HeatMapComponent,
    TooltipComponent
  ],
  providers: [ HeatMapService ],
  exports: [ HeatMapComponent ]
})
export class HeatMapModule { }
