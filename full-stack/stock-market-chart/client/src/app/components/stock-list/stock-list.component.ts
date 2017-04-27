import { SocketService } from '../../services/socket.service';
import { StockService } from '../../services/stock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: [ './stock-list.component.scss' ]
})
export class StockListComponent implements OnInit {

  constructor(
    private socketService: SocketService,
    private stockService: StockService
  ) { }

  get stocks() {
    return this.stockService.stockNames;
  }

  ngOnInit() {
  }

  onAdd(stock: string): void {
    this.socketService.main();
    this.stockService.addStock(stock);
  }

  onRemove(stock: string): void {
    this.stockService.removeStock(stock);
  }

}
