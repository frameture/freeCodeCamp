import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: [ './not-found.component.scss' ]
})
export class NotFoundComponent {

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate([ '/' ]);
  }
}
