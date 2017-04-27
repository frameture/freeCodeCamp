import { StockService } from './stock.service';
import { Injectable } from '@angular/core';

import * as socket from 'socket.io-client';

@Injectable()
export class SocketService {
  
  private io;

  constructor(private stockService: StockService) { }
  
  main(): void {
    this.io = socket.connect('http://localhost:8181');
    
  }
}
