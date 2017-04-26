import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { BarsService } from '../../services/bars.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: [ './bars.component.scss' ]
})
export class BarsComponent implements OnInit {

  bars;
  going;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private barsService: BarsService,
    private userService: UserService
  ) { }

  doIGo(id: string): string {
    const clientId = this.userService.getProfile();
    for (let i = 0; i < this.going.length; i++) {
      const venue = this.going[ i ];
      if (venue.venueId !== id) { continue; }
      if (venue.going && venue.going.indexOf(clientId) >= 0) {
        return 'yes';
      }
    }
    return 'no';
  }

  howManyGoing(id: string): number {
    for (let i = 0; i < this.going.length; i++) {
      const venue = this.going[ i ];
      if (venue.venueId !== id) { continue; }
      return venue.going.length || 0;
    }
    return 0;
  }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.barsService.getBars(params[ 'location' ]))
      .subscribe((res) => {
        this.going = res.going;
        this.bars = res.venues;
      });
  }

  onGo(id: string): void {
    this.barsService
      .setBar(id)
      .subscribe(res =>
        this.router.navigate([ '/' ]) );
  }


}
