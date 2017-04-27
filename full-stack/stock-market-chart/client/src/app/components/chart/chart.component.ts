import { Component, OnInit } from '@angular/core';

import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
})
export class ChartComponent implements OnInit {
  
  stocks;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stocks = this.stockService.getStocks();
  }
  
}
