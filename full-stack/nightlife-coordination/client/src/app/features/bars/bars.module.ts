import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarsComponent } from './bars.component';
import { BarsRoutingModule } from './bars-routing.module';

@NgModule({
  imports: [
    BarsRoutingModule,
    CommonModule
  ],
  declarations: [BarsComponent]
})
export class BarsModule { }
