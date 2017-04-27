import { ChartService } from '../../services/chart.service';
import { Component, OnInit } from '@angular/core';

import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
})
export class ChartComponent implements OnInit {

  stocks;
  data;

  constructor(
    private chartService: ChartService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.chartService.createChart();
    this.getData();
  }

  private getData(): void {
    this.stocks = this.stockService.getStocks();
  }

}
