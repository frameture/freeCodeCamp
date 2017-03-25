import { Injectable } from '@angular/core';

import * as d3 from 'd3';
import * as topojsonModule from './topojson';

import { DataService } from '../data.service';

@Injectable()
export class GlobeService {

  private topojson: any = topojsonModule;

  private map: any;
  private meteorite: any;
  private width: number;
  private height: number;
  private selector: string;

  private graticule;
  private svg;
  private path;
  private projection;

  constructor(private dataService: DataService) { }

  appendGlobe(
    selector: string,
    width: number,
    height: number
  ): void {
    this.selector = selector;
    this.width = width;
    this.height = height;

    this.createGlobe();
  }

  private createGlobe(): void {
    this.getData();
    this.setSVG();
    this.setProjection();
    this.setPath();
  }

  private setGraticule(): void {
    this.graticule = this.svg.selectAll('path')
      .data(this.topojson.feature(this.map, this.map.objects.countries).features)
      .enter()
      .append('path')
      .attr('fill', '#95E1D3')
      .attr('stroke', '#266D98')
      .attr('d', this.path);
  }

  private setProjection(): void {
    this.projection = d3.geoEquirectangular();
  }

  private setPath(): void {
    this.path = d3.geoPath(this.projection);
  }

  private setSVG(): void {
    this.svg = d3.select(this.selector)
      .attr('width', this.width)
      .attr('height', this.height);
  }

  private getData(): void {
    this.dataService.getMeteoriteData()
      .subscribe(data => this.meteorite = data);

    this.dataService.getMapData()
      .subscribe((data) => {
        this.map = data;
        this.setGraticule();
      });
  }

}
