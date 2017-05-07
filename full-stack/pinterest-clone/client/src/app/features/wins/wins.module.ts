import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinsRoutingModule } from './wins-routing.module';
import { WinsComponent } from './wins.component';

@NgModule({
  imports: [
    CommonModule,
    WinsRoutingModule
  ],
  declarations: [WinsComponent]
})
export class WinsModule { }
