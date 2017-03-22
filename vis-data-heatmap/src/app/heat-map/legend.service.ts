import { Injectable } from '@angular/core';

import * as d3 from 'd3';

import { Data } from '../data';
import { Margin } from '../margin';
import { ScaleLinear } from 'd3';

@Injectable()
export class LegendService {

  private data: Data[];
  private innerWidth: number;
  private innerHeight: number;
  private outerWidth: number;
  private outerHeight: number;
  private margin: Margin;

  private cells;
  private chart;
  private colors;
  private min: number;
  private max: number;
  private legend;
  private scale: ScaleLinear<number, number>;
  private variances: number[];

  public createLegend(
    chart,
    width: number,
    height: number,
    margin: Margin,
    data: Data[]
  ): void {
    this.chart = chart;
    this.outerHeight = height;
    this.outerWidth = width;
    this.margin = margin;
    this.data = data;

    this.setInnerSize();
    this.setMinMax();
    this.setScale();
    this.appendLegend();
    this.bindData();
    this.appendCells();
    this.appendAxis();

    return this.legend;
  }

  public getColor(variance: number): string {
    const index = this.variances.indexOf(variance) + 1;
    const maxIndex = this.variances.length;
    const percent = index / maxIndex;
    const red = percent * 255;

    return `rgba( ${ Math.round(red) }, 110, 90, 1)`;
  }

  private appendAxis(): void {
    const axis = d3.axisBottom(this.scale).ticks(10);

    this.legend.append('g')
      .attr('class', 'legend-axis')
      .call(axis);
  }

  private appendCells(): void {
    this.cells.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', (ele) => this.getColor(ele));
  }

  private appendLegend(): void {
    this.legend = this.chart.append('g')
      .attr('class', 'legend');
  }

  private bindData(): void {
    console.log('scale', this.scale(-5))
    this.cells = this.legend.selectAll('g')
      .data(this.variances)
      .enter().append('g')
      .attr('transform', (ele, i) => `translate( 
        ${ this.scale(ele) }, -20 
        )`);
  }
  private setInnerSize(): void {
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
  }

  private setMinMax(): void {
    this.min = Infinity;
    this.max = -Infinity;

    for (let i = 0; i < this.data.length; i++) {
      const variance = this.data[ i ].variance;
      if (variance < this.min) {
        this.min = variance;
      } else if (variance > this.max) {
        this.max = variance;
      }
    }
    this.min = Math.round(this.min);
    this.max = Math.round(this.max);

    this.variances = d3.range(this.min, this.max);
  }

  private setScale(): void {
    this.scale = d3.scaleLinear()
      .domain([ this.min, this.max ])
      .range([ 0, this.innerWidth ]);
  }

}
