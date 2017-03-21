import { Component, OnInit } from '@angular/core';

import { ChartService } from '../chart.service';
import { DataService } from '../data.service';
import { Margin } from '../margin';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: [ './scatter-plot.component.css' ]
})
export class ScatterPlotComponent implements OnInit {

  data: Array<any>;

  private width: number;
  private height: number;
  private margin: Margin;

  constructor(
    private chartService: ChartService,
    private dataService: DataService
  ) {
    this.width = 600;
    this.height = 500;
    this.margin = new Margin(20, 60, 20, 20);
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((data) => {
        this.data = data;
        this.createChart();
      });
  }

  private createChart(): void {
    this.chartService.createChart(
      '.chart',
      this.width,
      this.height,
      this.margin,
      this.data
    );
  }

}
