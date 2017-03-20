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
    this.margin = new Margin(20, 20, 40, 40);
    this.width = 960;
    this.height = 600;
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
    console.log(response);
    this.data = response.map((e) => new DataEntry(e[ 0 ], e[ 1 ]));
  }

}
