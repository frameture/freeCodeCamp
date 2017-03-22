import { Margin } from '../margin';
import { Injectable } from '@angular/core';

import * as d3 from 'd3';
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

  private chart;
  private cell;
  private colors;
  //  private variances;
  private legend;
  private tooltip;
  private xAxis;
  private xScale: ScaleLinear<number, number>;
  private yAxis;
  private yScale: ScaleBand<string>;

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
    //this.setColors();
    this.setChart();
    this.setXScale();
    this.setYScale();
    this.bindData();
    this.appendCells();
    this.appendXAxis();
    this.appendYAxis();
    this.appendTitles();
    //this.appendLegend();
    // this.appendTooltip();
    // this.registerTooltipHandlers();
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
        ${ this.margin.bottom * 1.3 }
      )`)
      .attr('class', 'title')
      .text('Years');
  }

  // private appendLegend(): void {
  //   const width = 150;
  //   const variances = this.variances;
  //   let scale: ScaleLinear<number, number>;

  //   scale = d3.scaleLinear()
  //     .domain([ variances[ 0 ], variances[ variances.length - 1 ] ])
  //     .range([ 0, width ]);

  //   this.legend = this.chart.append('g')
  //     .attr('transform', `translate(
  //     ${ this.innerWidth - width },
  //     ${ this.innerHeight }
  //   )`);

  //   this.legend.selectAll('g')
  //     .enter().append('g')
  //     .attr('x', (ele) => `translate( ${ scale(ele.variance) } )`);

  //   this.legend.append(d3.axisBottom(scale));

  // }

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

  private setColors(): void {
    const variances = [];
    this.data.forEach((ele) => {
      if (!variances.includes(ele.variance)) {
        variances.push(ele.variance);
      }
    });
    variances.sort();

    const reduced: number[] = [];
    variances.forEach((ele, i) => {
      if (i % 100 === 0) {
        reduced.push(ele);
      }
    });

    this.colors = [];

    reduced.forEach((ele, i) => {
      this.colors.push(
        { variance: ele, color: `rgba( ${ 250 / i } , 0, 0)` });
    });

  }

  private appendCells(): void {
    this.cell
      .append('rect')
      .attr('height', this.yScale.bandwidth() - 5)
      .attr('width', this.innerWidth / this.getYears().length)
      .style('fill', (ele) => 'blue');
    // .style('fill', (ele) => this.determineColor(ele));

    // this.cell
    //   .append('text')
    //   .attr('transform', `translate(15, 9 )`)
    //   .text((ele) => ele[ 'Name' ]);

    //this.cell
    //.on('mouseover', (ele) => console.log(ele));
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

  // private determineColor(ele: Data): string {
  //   for (let i = 0; i < this.colors.length; i++) {
  //     const e = this.colors[ i ];
  //     if (e.variance === ele.variance) {
  //       return e.color;
  //     }
  //   }
  // }

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

  private setChart(): void {
    this.chart = d3.select(this.selector)
      .attr('width', this.outerWidth)
      .attr('height', this.outerHeight);
  }

  private setInnerSize(): void {
    this.innerWidth = this.outerWidth - this.margin.left - this.margin.right;
    this.innerHeight = this.outerHeight - this.margin.top - this.margin.bottom;
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

  private getYears(): number[] {
    const years = [];
    this.data.forEach((ele) => {
      if (!years.includes(ele.year)) {
        years.push(ele.year);
      }
    });
    return years;
  }

}
