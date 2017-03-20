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
    mouseOverHandler: (entry: DataEntry) => void,
    mouseOutHandler: () => void
  ) {
    this.data = data;
    this.outerHeight = outerHeight;
    this.outerWidth = outerWidth;
    this.margin = margin;
    this.calculateInnerSize();

    const scaleX = this.getScaleX();
    const scaleY = this.getScaleY();

    const axisX = d3.axisBottom(d3.scaleBand()
      .domain(this.getYears())
      .rangeRound([ 0, this.innerWidth ]));
    const axisY = d3.axisLeft(scaleY);

    const chart = d3.select(selector)
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    const bar = chart.selectAll('g')
      .data(this.data)
      .enter().append('g')
      .attr('transform', (d) => `translate( ${ scaleX(d.quarter) + this.margin.left }, 0 )`);

    chart.append('g')
      .attr('class', 'tooltip')
      .append('rect')
      .attr('width', 250)
      .attr('height', 30);
    const tooltip = d3.select('.tooltip');
    tooltip.append('text')
      .text('sssss');


    bar.append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => scaleY(d.value))
      .attr('width', scaleX.bandwidth())
      .attr('height', (d) => this.innerHeight - scaleY(d.value))
      .on('mouseover', (d) => {
        const event: MouseEvent = d3.event;
        tooltip.select('text')
          .text(this.toCurrency(d))
          .attr('x', event.clientX - 500)
          .attr('y', event.clientY - 150);

        tooltip.transition()
          .duration(200)
          .style('opacity', 1);

        tooltip.select('rect')
          .attr('x', event.clientX - 505)
          .attr('y', event.clientY - 170);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
      });

    chart.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate( ${ this.margin.left }, ${ this.innerHeight } )`)
      .call(axisX);

    chart.append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate( ${ this.margin.left }, ${ this.margin.top } )`)
      .call(axisY)
      .append('text')
      .attr('transform', `translate( ${ this.margin.left }, ${ this.margin.top } )`)
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('GDP in Billions $');
  }

  private calculateInnerSize() {
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
  }

  private getScaleX(): ScaleBand<string> {
    return d3.scaleBand()
      .domain(this.data.map((d) => d.quarter))
      .rangeRound([ 0, this.innerWidth ]);
  }

  private getScaleY(): ScaleLinear<number, number> {
    return d3.scaleLinear()
      .domain([ 0, d3.max(this.data, (d) => d.value) ])
      .range([ this.innerHeight, 0 ]);
  }

  private getYears(): string[] {
    const years = [];
    this.data.forEach((d, i) => {
      const year = parseFloat(d.quarter.substring(0, 4));
      if (year % 5 === 0) {
        years.push(year);
      }
    });
    return years;
  }

  private toCurrency(data: DataEntry): string {
    return `$ ${ data.value } Billion --- ${ data.quarter }`;

  }
}
