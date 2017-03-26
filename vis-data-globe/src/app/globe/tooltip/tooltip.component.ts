import { Component, OnInit } from '@angular/core';

import { GlobeService } from '../globe.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: [ './tooltip.component.css' ]
})
export class TooltipComponent implements OnInit {

  meteorite: any;
  position: any;
  show: boolean;

  constructor(private globeService: GlobeService) { }

  ngOnInit() {
    this.registerHandlers();
  }

  private onMouseOver(data: any, event: any): void {
    this.meteorite = data.properties;
    this.position = { x: event.layerX + 'px', y: event.layerY + 'px' };
    this.show = true;
  }

  private onMouseOut(): void {
    this.show = false;
  }

  private registerHandlers(): void {
    this.globeService.registerTooltipHandler(
      (data, event) => this.onMouseOver(data, event),
      () => this.onMouseOut()
    );
  }

}
