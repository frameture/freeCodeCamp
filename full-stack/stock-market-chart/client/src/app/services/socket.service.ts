import { StockService } from './stock.service';
import { Injectable } from '@angular/core';

import * as socket from 'socket.io-client';

@Injectable()
export class SocketService {

  private io: SocketIOClient.Socket;

  constructor(private stockService: StockService) {
    this.setSocket();
  }

  addStock(stock: string): void {
    this.stockService.addStock(stock, () => this.broadcastAdd(stock));
  }

  removeStock(stock: string): void {
    this.stockService.removeStock(stock, () => this.broadcastRemove(stock));
  }

  broadcastAdd(stock: string, ): void {
    this.io.emit('add', stock);
  }

  broadcastRemove(stock: string): void {
    this.io.emit('remove', stock);
  }

  private setSocket(): void {
    this.io = socket('http://localhost:8181');

    this.io.on('remove', (stock) => {
      this.stockService.updateData(stock, 'remove');
    });

    this.io.on('add', (stock) => {
      this.stockService.updateData(stock, 'add');
    });
  }

}
