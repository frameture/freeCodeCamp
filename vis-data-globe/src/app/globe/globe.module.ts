import { MoveDirective } from '../move.directive';
import { CommonModule } from '@angular/common';

import { GlobeComponent } from './globe.component';
import { GlobeService } from './globe.service';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';


@NgModule({
  declarations: [
    GlobeComponent,
    MoveDirective,
    TooltipComponent
  ],
  imports: [ CommonModule ],
  exports: [ GlobeComponent, TooltipComponent ],
  providers: [ GlobeService ]
})
export class GlobeModule { }
