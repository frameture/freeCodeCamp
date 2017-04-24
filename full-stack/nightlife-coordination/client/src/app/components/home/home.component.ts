import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { BarsService } from '../../services/bars.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  location: string;

  constructor(
    private barsService: BarsService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.router.navigate([ '/bars', this.location ]);
  }

}
