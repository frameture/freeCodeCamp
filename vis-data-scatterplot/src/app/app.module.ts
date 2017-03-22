import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { ChartService } from './chart.service';

@NgModule({
  declarations: [
    AppComponent,
    ScatterPlotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ChartService,
    DataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
