import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { BackendService } from '../backend.service';
import { Timestamp } from 'app/timestamp';

@Component({
  template: '{{ timestamp | json }}',
})
export class TimestampComponent implements OnInit {

  timestamp: Timestamp;

  constructor(
    private be: BackendService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.be.getTimestamp(params[ 'date' ]))
      .subscribe(res => this.extractTimestamp(res));
  }

  private extractTimestamp(response) {
    this.timestamp = <Timestamp>JSON.parse(response._body);
  }

}
