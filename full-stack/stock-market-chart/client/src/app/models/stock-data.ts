export class StockData {

  names: string[];
  data: any[];

  constructor() {
    this.names = [];
    this.data = [];
  }

  addOne(stock: any, onAdded: () => void): void {
    const symbol = stock[ 'Meta Data' ][ '2. Symbol' ];
    this.names.push(symbol);

    this.addData(stock);
    onAdded();
  }

  removeOne(stock: string, onRemoved: () => void): void {
    this.names.splice(this.names.indexOf(stock), 1);
    this.removeOneFromData(stock);
    onRemoved();
  }

  hasOne(stock: string): boolean {
    return this.names.indexOf(stock) >= 0;
  }

  private removeOneFromData(stock: string): void {
    const index = this.data[ 0 ].indexOf(stock);

    for (let i = 0; i < this.data.length; i++) {
      this.data[ i ].splice(index, 1);
    }
  }

  private addData(stock: any): void {
    const keys = Object.keys(stock);
    const data = stock[ keys[ 1 ] ];
    const dateKeys = Object.keys(data);

    if (this.data.length === 0) {
      this.data.push([ 'Time' ]);
      for (let i = dateKeys.length - 1; i >= 0; i--) {
        this.data.push([ dateKeys[ i ] ]);
      }
    }

    this.data[ 0 ].push(this.names[ this.names.length - 1 ]);

    for (let i = 0; i < dateKeys.length; i++) {
      const close = data[ dateKeys[ dateKeys.length - i - 1 ] ][ '4. close' ];
      this.data[ i + 1 ].push(parseInt(close, 10));
    }
  }
}
