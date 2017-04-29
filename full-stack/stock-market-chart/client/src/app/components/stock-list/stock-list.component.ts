import { Component } from '@angular/core';

import { SocketService } from '../../services/socket.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: [ './stock-list.component.scss' ]
})
export class StockListComponent {

  constructor(
    private socketService: SocketService,
    private stockService: StockService
  ) { }

  get stocks() {
    return this.stockService.names;
  }

  onAdd(stock: string): void {
    this.socketService.addStock(stock);
  }

  onRemove(stock: string): void {
    this.socketService.removeStock(stock);
  }

}
