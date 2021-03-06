import { Component, OnInit } from '@angular/core';

import { GlobeService } from './globe.service';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
})
export class GlobeComponent implements OnInit {

  selector: string;
  width: number;
  height: number;

  constructor(private globeService: GlobeService) {
    this.selector = '.globe';
    this.width = 3000;
    this.height = 1600;
  }

  ngOnInit() {
    this.creteGlobe();
  }

  private creteGlobe(): void {
    this.globeService.appendGlobe(
      this.selector,
      this.width,
      this.height,
    );
  }

}
