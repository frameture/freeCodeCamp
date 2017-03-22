import { Component, OnInit } from '@angular/core';

import { Data } from 'app/data';
import { HeatMapService } from '../heat-map.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: [ './tooltip.component.css' ]
})
export class TooltipComponent implements OnInit {
  data: Data;
  margin: number;
  show: boolean;
  position;
  date: string;
  variance: number;


  constructor(private heatMapService: HeatMapService) {
    this.margin = 40;
    this.position = {
      top: 0,
      left: 0
    };
  }

  ngOnInit() {
    this.registerEventHandlers();
  }

  private registerEventHandlers(): void {
    this.heatMapService.registerTooltipHandlers(
      (data, event) => this.mouseOver(data, event),
      () => this.mouseOut()
    );
  }

  private mouseOver(data: Data, event: number[]): void {
    this.setPosition(event[ 0 ], event[ 1 ]);
    this.date = `${ data.year } / ${ data.month }`;
    this.variance = data.variance;
    this.show = true;
  }

  private mouseOut(): void {
    this.show = false;
    this.data = null;
  }

  private setPosition(left: number, top: number): void {
    this.position.left = left;
    this.position.top = top - this.margin;
  }

}
