import { StockService } from '../../services/stock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  constructor(private stockService: StockService) { }

  ngOnInit() {
  }
  
  onAddStock(stock: string): void {
    console.log(stock);
    this.stockService.addStock(stock);
  }

}
