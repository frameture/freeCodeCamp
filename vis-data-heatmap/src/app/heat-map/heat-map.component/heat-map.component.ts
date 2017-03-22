import { Component, OnInit } from '@angular/core';

import { Data } from 'app/data';
import { DataService } from 'app/data.service';
import { HeatMapService } from 'app/heat-map/heat-map.service';
import { Margin } from 'app/margin';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: [ './heat-map.component.css' ]
})
export class HeatMapComponent implements OnInit {

  private data: Data[];
  private width: number;
  private height: number;
  private margin: Margin;

  constructor(
    private dataService: DataService,
    private heatMapService: HeatMapService
  ) {
    this.width = 800;
    this.height = 500;
    this.margin = new Margin(20, 60, 60, 80);
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((data) => {
        this.data = data;
        this.createHeatMap();
      });
  }

  private createHeatMap(): void {
    this.heatMapService.createHeatMap(
      '.heat-map',
      this.width,
      this.height,
      this.margin,
      this.data
    );
  }

}
