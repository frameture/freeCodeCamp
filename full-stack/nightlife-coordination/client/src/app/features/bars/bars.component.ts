import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { BarsService } from '../../services/bars.service';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: [ './bars.component.scss' ]
})
export class BarsComponent implements OnInit {

  bars;

  constructor(
    private route: ActivatedRoute,
    private barsService: BarsService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.barsService.getBars(params['location']))
      .subscribe(res => this.bars = res);
  }

}
