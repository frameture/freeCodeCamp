import { Margin } from './margin';
import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import { Selection, ScaleBand, ScaleLinear } from 'd3';

@Injectable()
export class ChartService {

  private data: Array<any>;
  private innerWidth: number;
  private innerHeight: number;
  private outerWidth: number;
  private outerHeight: number;
  private margin: Margin;
  private selector: string;

  private chart;
  private score;
  private tooltip;
  private xAxis;
  private xScale: ScaleBand<string>;
  private yAxis;
  private yScale: ScaleLinear<number, number>;

  createChart(
    selector: string,
    width: number,
    height: number,
    margin: Margin,
    data: Array<any>
  ): void {
    this.selector = selector;
    this.outerWidth = width;
    this.outerHeight = height;
    this.margin = margin;
    this.data = data;

    this.setInnerSize();
    this.setChart();
    this.setXScale();
    this.setYScale();
    this.bindData();
    this.appendScores();
    this.appendXAxis();
    this.appendYAxis();
    this.appendTitle();
    this.appendLegend();
    this.appendTooltip();
    this.registerTooltipHandlers();
  }

  private appendLegend(): void {
    let legend = this.chart.append('g')
      .attr('transform', `translate(
      ${ this.innerWidth - 6 * this.margin.left },
      ${ this.innerHeight * .62 }
    )`)
      .attr('class', 'legend');

    legend
      .append('circle')
      .attr('r', '5')
      .attr('cx', '5')
      .attr('cy', '5')
      .style('fill', 'powderblue');

    legend
      .append('text')
      .attr('transform', `translate(20, 9 )`)
      .text('No doping allegations');

    legend = this.chart.append('g')
      .attr('transform', `translate(
      ${ this.innerWidth - 6 * this.margin.left },
      ${ this.innerHeight * .62 + 30 }
    )`)
      .attr('class', 'legend');

    legend
      .append('circle')
      .attr('r', '5')
      .attr('cx', '5')
      .attr('cy', '5')
      .style('fill', 'steelblue');

    legend
      .append('text')
      .attr('transform', `translate(20, 9 )`)
      .text('Riders with doping allegations');
  }

  private appendScores(): void {
    this.score
      .append('circle')
      .attr('r', '5')
      .attr('cx', '5')
      .attr('cy', '5')
      .style('fill', (ele) => this.determineColor(ele));

    this.score
      .append('text')
      .attr('transform', `translate(15, 9 )`)
      .text((ele) => ele[ 'Name' ]);

    this.score
      .on('mouseover', (ele) => console.log(ele));
  }

  private appendTitle(): void {
    this.chart.select('.axis.y')
      .append('text')
      .attr('transform', `translate( 
        ${ this.margin.left }, 
        ${ this.margin.top } 
      )`)
      .attr('transform', 'rotate(-90)')
      .attr('class', 'title')
      .attr('dy', '15')
      .text('Place');
  }

  private appendTooltip(): void {
    this.tooltip = this.chart.append('g')
      .attr('transform', `translate(
      ${ this.innerWidth - 6 * this.margin.left },
      ${ this.innerHeight * .75 }
    )`)
      .attr('class', 'tooltip')
      .style('opacity', 0);

    this.tooltip.append('rect')
      .attr('width', '170')
      .attr('height', '50')
      .style('fill', 'powderblue');

    this.tooltip
      .append('text')
      .attr('class', 'name')
      .attr('transform', `translate(20, 15 )`);

    this.tooltip
      .append('text')
      .attr('class', 'year')
      .attr('transform', `translate(20, 40 )`);
  }

  private appendXAxis(): void {
    const axis = d3.axisBottom(this.getXAxisScale());

    this.chart.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate( 
        ${ this.margin.left },
        ${ this.innerHeight + this.margin.top }
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
    this.score = this.chart.selectAll('g')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'score')
      .attr('transform', (d) => `translate( 
        ${ this.margin.left + this.xScale(d[ 'Time' ]) + 5 } , 
        ${ this.yScale(this.data.indexOf(d)) }
      )`);
  }

  private determineColor(ele: any): string {
    if (ele[ 'Doping' ]) {
      return 'steelblue';
    } else {
      return 'powderblue';
    }
  }

  private getTime(seconds: number): string {
    let minutes = 0;

    while (seconds >= 60) {
      seconds -= 60;
      minutes++;
    }

    return `${ minutes }:${ seconds }`;
  }

  private getXAxisScale(): ScaleBand<string> {
    const reduced = [];
    this.data.forEach((ele) => {
      const time = parseFloat(ele[ 'Seconds' ]);
      if (time % 15 === 0) {
        reduced.push(this.getTime(time));
      }
    });

    return d3.scaleBand()
      .domain(reduced.reverse())
      .range([ 0, this.innerWidth ]);
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
    this.xScale = d3.scaleBand()
      .domain(this.data.map((ele) => ele[ 'Time' ]).reverse())
      .range([ 0, this.innerWidth ]);
  }

  private setYScale(): void {
    this.yScale = d3.scaleLinear()
      .domain([ d3.max(this.data, (ele) => ele[ 'Place' ]), 0 ])
      .range([ this.innerHeight + this.margin.top, 5 ]);

  }


  private registerTooltipHandlers(): void {
    this.score.on('mouseover', (ele) => this.showHideTooltip(ele));
    this.score.on('mouseout', (ele) => this.showHideTooltip());
  }

  private showHideTooltip(data?: any): void {
    const opacity = data ? 1 : 0;

    if (data) {
      this.tooltip.select('.name')
        .text(data[ 'Name' ] + ':' + data[ 'Nationality' ]);
      this.tooltip.select('.year')
        .text('Year: ' + data[ 'Year' ] + ', Time: ' + data[ 'Time' ]);
    }

    this.tooltip
      .transition()
      .delay(100)
      .duration(200)
      .style('opacity', opacity);
  }

}
