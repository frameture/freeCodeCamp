import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tm-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: [ './timestamp.component.scss' ]
})
export class TimestampComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const date = this.route.params.subscribe(params => console.log('date', params[ 'date' ]));
  }

}
