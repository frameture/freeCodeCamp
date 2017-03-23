import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { Country, Link } from '../classes';
import { Force } from 'd3';

@Injectable()
export class GraphService {

  private countries: Country[];
  private links: Link[];
  private outerWidth: number;
  private outerHeight: number;
  private selector: string;

  private link;
  private graph;
  private node;
  private simulation;
  private flags = [];
  private tooltip;

  createGraph(
    selector: string,
    width: number,
    height: number,
    countries: Country[],
    links: Link[]
  ): void {
    this.selector = selector;
    this.outerWidth = width;
    this.outerHeight = height;
    this.countries = countries;
    this.links = links;

    this.addIdsToNodes();

    this.setGraph();
    this.setSimulation();
    this.setLinks();
    this.setTooltip();
    this.setFlags();
    this.setNodes();
  }

  private addIdsToNodes(): void {
    this.countries = this.countries
      .map((ele, i) => {
        return { id: i, country: ele.country, code: ele.code };
      });
  }

  private setFlags(): void {
    this.countries.forEach((ele, i) => {
      const flag = document.createElement('div');
      flag.onmouseover = (event) => this.mouseOver(ele, event);
      flag.onmouseout = () => this.mouseOut();
      this.flags.push(flag);
      document.body.appendChild(flag);
    });
  }

  private mouseOver(element, event): void {
    this.tooltip.innerHTML = element.country;
    this.tooltip.style.left = event.clientX + 'px';
    this.tooltip.style.top = event.clientY + 'px';
    this.tooltip.style.visibility = 'visible';
  }

  private mouseOut(): void {
    this.tooltip.style.visibility = 'hidden';
  }

  private setGraph(): void {
    this.graph = d3.select(this.selector)
      .attr('width', this.outerWidth)
      .attr('height', this.outerHeight);
  }

  private setLinks(): void {
    this.link = this.graph.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.links)
      .enter().append('line')
      .attr('class', 'link');
  }

  private setNodes(): void {
    this.node = this.graph.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.countries)
      .enter().append('circle')
      .attr('r', 5)
      .attr('class', d => {
        this.flags[ d.id ].setAttribute('class', `flag flag-${ d.code }`);
        return `flag-${ d.code }`;
      })
      .call(d3.drag()
        .on('start', d => this.dragStarted(d))
        .on('drag', d => this.dragged(d))
        .on('end', d => this.dragEnded(d))
      );

    this.node.append('text').text(d => d.country);
  }

  private setSimulation(): void {
    this.simulation = d3.forceSimulation()
      .nodes(this.countries)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.outerWidth * .8, this.outerHeight * .8))
      .force('link', d3.forceLink(this.links))
      // .force('link', d3.forceLink().links(this.links).id(d => d[ 'id' ]))
      .on('tick', () => this.ticked());
  }

  private setTooltip(): void {
    this.tooltip = document.createElement('h3');
    this.tooltip.setAttribute('class', 'tooltip');
    document.body.appendChild(this.tooltip);
  }

  private ticked(): void {
    this.link
      .attr('x1', d => d.source.x * .3)
      .attr('y1', d => d.source.y * .5)
      .attr('x2', d => d.target.x * .3)
      .attr('y2', d => d.target.y * .5);

    this.node
      .attr('cx', d => {
        this.flags[ d.id ].style.left = d.x * .3 + 'px';
        return d.x * .3;
      })
      .attr('cy', d => {
        this.flags[ d.id ].style.top = d.y * .5 + 'px';
        return d.y * .5;
      });
  }

  private dragStarted(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  private dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  private dragEnded(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  }
}

