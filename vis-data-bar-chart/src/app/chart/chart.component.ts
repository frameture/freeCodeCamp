import { ChartService } from '../chart.service';
import { Component, OnInit } from '@angular/core';

import { DataEntry } from '../data-entry';
import { DataService } from '../data.service';
import { Margin } from '../margin';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ]
})
export class ChartComponent implements OnInit {
  private width: number;
  private height: number;
  private margin: Margin;
  private data: DataEntry[];

  constructor(
    private chartService: ChartService,
    private dataService: DataService
  ) {
    this.margin = new Margin(10, 0, 30, 50);
    this.width = 900;
    this.height = 450;
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((d) => {
        this.extractData(d);
        this.createChart();
      });
  }

  private createChart() {
    this.chartService.createChart(
      '.chart',
      this.data,
      this.width,
      this.height,
      this.margin
    );
  }

  private extractData(response) {
    this.data = response.map((e) => new DataEntry(e[ 0 ], e[ 1 ]));
  }

}
