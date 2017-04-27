import { SocketService } from './services/socket.service';
import { ChartService } from './services/chart.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BackendService } from './services/backend.service';
import { ChartComponent } from './components/chart/chart.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockService } from './services/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BackendService,
    ChartService,
    SocketService,
    StockService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
