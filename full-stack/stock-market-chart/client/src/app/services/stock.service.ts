import { ChartService } from './chart.service';
import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';
import { StockData } from '../models/stock-data';

@Injectable()
export class StockService {

  private stocks: StockData;

  timeSeries: 'INTRADAY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  // interval: '1min' | '5min' | '15min' | '30min' | '60min';

  constructor(
    private be: BackendService,
    private cs: ChartService,
  ) {
    this.timeSeries = 'DAILY';
   // this.interval = '60min';
    this.fetchStocks();
  }

  get data() { return this.stocks.data; }
  get names() { return this.stocks.names; }

  addStock(stock: string, broadcastMessage: () => void): void {
    if (this.hasOne(stock)) { return; }

    this.be
      .addStock(stock)
      .subscribe((res) => {
        if (res.success) {
          this.updateData(stock, 'add');
          broadcastMessage();
        }
      });
  }

  hasOne(stock: string): boolean {
    return this.stocks.hasOne(stock);
  }

  updateData(stock: string, option: 'add' | 'remove'): void {
    option === 'add'
      ? this.fetchAndAddOne(stock, () => this.cs.createChart(this.data))
      : this.stocks.removeOne(stock, () => this.cs.createChart(this.data));
  }

  removeStock(stock: string, broadcastMessage: () => void): void {
    if (!this.hasOne(stock) || this.names.length === 0) { return; }

    this.be
      .removeStock(stock)
      .subscribe(res => {
        this.updateData(stock, 'remove');
        broadcastMessage();
      });
  }

  private fetchAndAddOne(stock: string, onAdded: () => void) {
    this.be
      .getStock(this.getUrl(stock))
      .subscribe(res => this.stocks.addOne(res, () => onAdded()));
  }

  private fetchStocks(): void {
    this.stocks = new StockData();

    this.be
      .getStocks()
      .subscribe((res) => {
        if (res.message) { return console.log(res.message); }
        res.forEach(stock => this.updateData(stock, 'add'));
      });
  }

  private getUrl(stock: string): string {
    return 'function=TIME_SERIES_' + this.timeSeries +
      '&symbol=' + stock;
  }

}
