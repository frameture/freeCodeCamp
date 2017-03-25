import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobeComponent } from './globe.component';
import { GlobeService } from './globe.service';

@NgModule({
  declarations: [ GlobeComponent ],
  imports: [ CommonModule ],
  exports: [ GlobeComponent ],
  providers: [ GlobeService ]
})
export class GlobeModule { }
