import { Injectable } from '@angular/core';

import * as d3 from 'd3';

@Injectable()
export class GlobeService {

  private data: JSON;
  private width: number;
  private height: number;
  private selector: string;

  private graticule;
  private svg;
  private path;
  private projection;

  createGlob(
    selector: string,
    width: number,
    height: number,
    data: JSON
  ): void {
    this.selector = selector;
    this.width = width;
    this.height = height;
    this.data = data;

    this.setProjection();
    this.setPath();
    this.setSVG();
    this.setGraticule();

    // this.bindData();
    // this.appendCells();
    // this.appendTitles();
  }

  private setGraticule(): void {
    this.graticule = this.svg.selectAll('path')
      .data(this.data[ 'features' ])
      .enter().append('path')
      .attr('d', d3.geoPath());
  }

  private setProjection(): void {
    this.projection = d3.geoEquirectangular()
      //  .scale(75)
      // .translate([ this.width / 2, this.height / 2 ])
      .rotate([ -180, 0 ]);
  }

  private setPath(): void {
    this.path = d3.geoPath(this.projection);
  }

  private setSVG(): void {
    this.svg = d3.select(this.selector)
      .attr('width', this.width)
      .attr('height', this.height);
  }

}
