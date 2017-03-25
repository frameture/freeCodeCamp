import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { GlobeService } from './globe.service';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
})
export class GlobeComponent implements OnInit {

  selector = '.globe';
  width = 1600;
  height = 1200;
  data: JSON;

  constructor(
    private dataService: DataService,
    private globeService: GlobeService
  ) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((data) => {
        this.data = data;
        this.globeService.createGlob(
          this.selector,
          this.width,
          this.height,
          this.data
        );
      });
  }

}
