import { Component, OnInit } from '@angular/core';

import { Country, Link } from 'app/classes';
import { DataService } from 'app/data.service';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
  styleUrls: [ './force-directed-graph.component.css' ]
})
export class ForceDirectedGraphComponent implements OnInit {

  private svgSelector = '.graph';
  private height = 600;
  private width = 900;
  private countries: Country[];
  private links: Link[];

  constructor(
    private dataService: DataService,
    private graphService: GraphService
  ) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((data) => {
        this.extractData(data);
        this.createGraph();
      });
  }

  private createGraph(): void {
    this.graphService.createGraph(
      this.svgSelector,
      this.width,
      this.height,
      this.countries,
      this.links
    );
  }

  private extractData(data: any): void {
    this.countries = data.nodes;
    this.links = data.links;
  }

}
