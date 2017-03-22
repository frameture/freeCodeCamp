import { Margin } from '../margin';
import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import { LegendService } from './legend.service';
import { ScaleBand, ScaleLinear } from 'd3';

import { Data } from '../data';

@Injectable()
export class HeatMapService {

  private data: Data[];
  private innerWidth: number;
  private innerHeight: number;
  private outerWidth: number;
  private outerHeight: number;
  private margin: Margin;
  private selector: string;

  private cell;
  private chart;
  private legend;
  private xAxis;
  private xScale: ScaleLinear<number, number>;
  private yAxis;
  private yScale: ScaleBand<string>;

  constructor(private legendService: LegendService) { }

  createHeatMap(
    selector: string,
    width: number,
    height: number,
    margin: Margin,
    data: Data[]
  ): void {
    this.selector = selector;
    this.outerWidth = width;
    this.outerHeight = height;
    this.margin = margin;
    this.data = data;

    this.setInnerSize();
    this.setChart();
    this.appendLegend();
    this.setXScale();
    this.setYScale();
    this.bindData();
    this.appendCells();
    this.appendXAxis();
    this.appendYAxis();
    this.appendTitles();
  }

  registerTooltipHandlers(
    mouseOver: (data: Data, event: number[]) => void,
    mouseOut: () => void
  ) {
    if (!this.cell) { // Retry if undefined;
      setTimeout(() => this.registerTooltipHandlers(mouseOver, mouseOut), 100);
      return;
    }

    this.cell
      .on('mouseover', (d) => {
        const event = d3.mouse(document.body);
        mouseOver(d, event);
      })
      .on('mouseout', () => mouseOut());
  }

  private appendCells(): void {
    this.cell
      .append('rect')
      .attr('height', this.yScale.bandwidth() - 5)
      .attr('width', this.innerWidth / this.getYears().length)
      .style('fill', ele => this.getColor(ele.variance));
  }

  private appendLegend(): void {
    const legendWidth = 250;
    const legendHeight = 150;

    this.legend = this.legendService.createLegend(
      this.chart,
      legendWidth,
      legendHeight,
      new Margin(0, 0, 0, 0),
      this.data
    );

    this.legend
      .attr('transform', `translate(
        ${ this.innerWidth - (legendWidth * .7) },
        ${ this.innerHeight * 1.15 }
      )`);
  }

  private appendTitles(): void {
    this.chart.select('.axis.y')
      .append('text')
      .attr('transform', `translate( 
        ${ -this.margin.left * .8 },
        ${ this.innerHeight * .5 } 
      ) rotate(-90)`)
      .attr('class', 'title')
      .text('Months');

    this.chart.select('.axis.x')
      .append('text')
      .attr('transform', `translate( 
        ${ this.innerWidth * .5 },
        ${ this.margin.bottom * 1.15 }
      )`)
      .attr('class', 'title')
      .text('Years');
  }

  private appendXAxis(): void {
    const axis = d3.axisBottom(this.xScale).tickFormat(d3.format('0000'));

    this.chart.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate( 
        ${ this.margin.left },
        ${ this.innerHeight + 5 }
      )`)
      .call(axis);
  }

  private appendYAxis(): void {
    const axis = d3.axisLeft(this.yScale);

    this.chart.append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate( 
        ${ this.margin.left }, 0)`)
      .call(axis);
  }

  private bindData(): void {
    this.cell = this.chart.selectAll('g')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'cell')
      .attr('transform', (ele) => `translate( 
        ${ this.margin.left + this.xScale(ele.year) } , 
        ${ this.yScale(this.monthToString(ele.month)) }
      )`);
  }

  private getColor(variance: number): string {
    variance = Math.round(variance);
    return this.legendService.getColor(variance);
  }

  private getYears(): number[] {
    const years = [];
    this.data.forEach((ele) => {
      if (!years.includes(ele.year)) {
        years.push(ele.year);
      }
    });
    return years;
  }

  private monthToString(month: number): string {
    const months = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];
    return months[ month - 1 ]; // 0 = January
  }

  private setChart(): void {
    this.chart = d3.select(this.selector)
      .attr('width', this.outerWidth)
      .attr('height', this.outerHeight);
  }

  private setInnerSize(): void {
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
  }

  private setXScale(): void {
    const years = this.getYears();
    this.xScale = d3.scaleLinear()
      .domain([ years[ 0 ], years.pop() ])
      .range([ 10, this.innerWidth ]);
  }

  private setYScale(): void {
    this.yScale = d3.scaleBand()
      .domain(this.data.map((ele) => this.monthToString(ele.month)))
      .range([ this.innerHeight, 0 ]);
  }

}
