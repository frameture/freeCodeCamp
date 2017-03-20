import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChartService } from './chart.service';
import { DataService } from './data.service';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [
    ChartService,
    DataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
