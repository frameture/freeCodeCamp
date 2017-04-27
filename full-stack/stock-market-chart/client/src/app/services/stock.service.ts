import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  private stocks: any[];
  timeSeries: 'INTRADAY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  interval: '1min' | '5min' | '15min' | '30min' | '60min';

  constructor(private be: BackendService) {
    this.stocks = [];
    this.timeSeries = 'INTRADAY';
    this.interval = '60min';
  }

  getStocks(): any[] {
    return this.stocks;
  }

  addStock(stock: string): void {
    this.mapStock(stock);
  }


  private mapStock(stock: string) {
    this.be
      .getStock(this.getUrl(stock))
      .subscribe((res) => {
        res = res._body
          .substring(0, res._body.lastIndexOf('undefined'));
        console.log(JSON.parse(res));
        this.stocks.push(JSON.parse(res));
      });
  }

  private getUrl(stock: string): string {
    return 'function=TIME_SERIES_' + this.timeSeries +
           '&interval=' + this.interval +
           '&symbol=' + stock;
  }

}
