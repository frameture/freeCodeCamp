import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  private stocks: any[];

  stockNames: string[];
  data;
  timeSeries: 'INTRADAY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  interval: '1min' | '5min' | '15min' | '30min' | '60min';

  constructor(private be: BackendService) {
    this.timeSeries = 'INTRADAY';
    this.interval = '60min';
    this.fetchStocks();
  }

  getStocks(): any[] {
    return this.stocks;
  }

  addStock(stock: string): void {
    this.be
      .addStock(stock)
      .subscribe((res) => {
        res = res.json();
        if (res.success) {
          this.stockNames.push(stock);
          this.mapStock(stock);
        }
      });
  }

  removeStock(stock: string): void {
    this.be
      .removeStock(stock)
      .subscribe(res => {
          this.fetchStocks();
          //   remove from this.stocks & this.stockNames
      });
  }

  private mapStock(stock: string) {
    this.be
      .getStock(this.getUrl(stock))
      .subscribe((res) => {
        res = res._body
          .substring(0, res._body.lastIndexOf('undefined'));
        console.log(JSON.parse(res));
        this.stocks.push(JSON.parse(res));
        // this.updateData();
      });
  }

  private getUrl(stock: string): string {
    return 'function=TIME_SERIES_' + this.timeSeries +
      '&interval=' + this.interval +
      '&symbol=' + stock;
  }

  private fetchStocks(): void {
    this.stocks = [];
    this.be
      .getStocks()
      .subscribe((res) => {
        res = res.json();
        console.log('stocks:', res);
        this.stockNames = res;
        if (res.message) { return console.log(res.message); }
        res.forEach((stock) => this.mapStock(stock));
      });
  }

  // private updateData(): void {
  //   this.data = [ [ 'Day' ] ];
  //   for (let i = 0; i < this.stocks.length; i++) {
  //     const stock = this.stocks[ i ][ 'Meta Data' ];
  //     this.data[ 0 ].push(stock.Symbol);
  //   }

  //   for (let i = 1; i < 11; i++) {
  //     this.data.push([ i ]);
  //     for (let j = 0; this.stocks.length; j++) {
  //       const stock = this.stocks[ j ];
  //       const prices = stock[ Object.keys(stock)[ 1 ] ];

  //       this.data[ i ] = prices[ '2017-04-20 13:00:00' ].close;
  //     }
  //   }

  //   console.log(this.data);
  // }

}
