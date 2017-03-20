import { DataEntry } from './data-entry';
import { Injectable } from '@angular/core';

import * as d3 from 'd3';

import { Margin } from './margin';
import { ScaleBand, ScaleLinear } from 'd3';


@Injectable()
export class ChartService {

  private data: DataEntry[];
  private outerWidth: number;
  private outerHeight: number;
  private innerWidth: number;
  private innerHeight: number;
  private margin: Margin;

  createChart(
    selector: string,
    data: Array<DataEntry>,
    outerWidth: number,
    outerHeight: number,
    margin: Margin,
  ) {
    console.log('chartService.createChart() called');
    this.data = data;
    this.outerHeight = outerHeight;
    this.outerWidth = outerWidth;
    this.margin = margin;
    this.calculateInnerSize();

    const scaleX = this.getScaleX();
    const scaleY = this.getScaleY();

    const chart = d3.select(selector)
      .attr('width', outerHeight)
      .attr('height', outerHeight);

    const bar = chart.selectAll('g')
      .data(this.data)
      .enter().append('g')
      .attr('transform', (d) => `translate( ${ scaleX(d.quarter) }, -5 )`);

    bar.append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => scaleY(d.value))
      .attr('width', scaleX.bandwidth())
      .attr('height', (d) => this.innerHeight - scaleY(d.value));
  }

  private calculateInnerSize() {
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
  }

  private getScaleX(): ScaleBand<string> {
    return d3.scaleBand()
      .domain(this.data.map((d) => d.quarter))
      .rangeRound([ 0, this.outerWidth ]);
  }

  private getScaleY(): ScaleLinear<number, number> {
    return d3.scaleLinear()
      .domain([ 0, d3.max(this.data, (d) => d.value) ])
      .range([ this.outerHeight, 0 ]);
  }

}
