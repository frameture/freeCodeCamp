import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import * as topojsonModule from './topojson';
import { DataService } from '../data.service';

@Injectable()
export class GlobeService {

  private topojson: any = topojsonModule;

  private mapData: any;
  private meteoriteData: any;
  private width: number;
  private height: number;
  private selector: string;

  private map;
  private meteorite;
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

  registerTooltipHandler(
    mouseover: (data, event) => void,
    mouseout: () => void
  ): void {
    if (!this.meteorite) {
      setInterval(() => this.registerTooltipHandler(mouseover, mouseout), 10);
      return;
    }

    this.meteorite
      .on('mouseover', d => mouseover(d, d3.event))
      .on('mouseout', d => mouseout());
  }

  private createGlobe(): void {
    this.getData();
    this.setSVG();
    this.setProjection();
    this.setPath();
  }


  private getData(): void {
    this.dataService.getMapData()
      .subscribe((data) => {
        this.mapData = data;
        this.setMap();
        this.getMeteoriteData();
      });
  }

  private getMasses(): number[] {
    return this.meteoriteData.features
      .map(ele => ele.properties.mass)
      .sort((a, b) => a - b)
      .filter(mass => mass);
  }

  private getMeteoriteData(): void {
    this.dataService.getMeteoriteData()
      .subscribe((data) => {
        this.meteoriteData = data;
        this.setMeteorites();
      });
  }

  private setMap(): void {
    this.map = this.svg.selectAll('path')
      .data(this.topojson
        .feature(this.mapData, this.mapData.objects.countries).features)
      .enter().append('path')
      .attr('fill', '#95E1D3')
      .attr('stroke', '#266D98')
      .attr('d', this.path);
  }

  private setMeteorites(): void {
    this.meteorite = this.svg.selectAll('circle')
      .data(this.meteoriteData.features.filter(e => e.geometry))
      .enter().append('circle')
      .attr('r', e => this.radius(e.properties.mass) * 2)
      .attr('transform', d => {
        return `translate( ${ this.projection([
          d.geometry.coordinates[ 0 ],
          d.geometry.coordinates[ 1 ]
        ]) })`;
      });
  }

  private setProjection(): void {
    this.projection = d3.geoEquirectangular()
      .scale(500)
      .translate([ this.width / 2, this.height / 2 ]);
  }

  private setPath(): void {
    this.path = d3.geoPath(this.projection);
  }

  private radius(value: number): number {
    if (value < 10000) { return 1; }
    else if (value < 30000) { return 2; }
    else if (value < 100000) { return 3; }
    else if (value < 320000) { return 5; }
    else if (value < 500000) { return 10; }
    else if (value < 1000000) { return 15; }
    else if (value < 2000000) { return 25; }
    else { return 40; }
  }

  private setSVG(): void {
    this.svg = d3.select(this.selector)
      .attr('width', this.width)
      .attr('height', this.height);
  }

}
