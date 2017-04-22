import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Poll } from '../../../models/poll';
import { PollService } from '../../../services/poll.service';

@Component({
  templateUrl: './poll-list.component.html',
  styleUrls: [ './poll-list.component.scss' ]
})
export class PollListComponent implements OnInit {

  polls: Poll[];

  constructor(
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pollService
      .getPolls()
      .subscribe(polls => this.polls = polls);
  }

  onNavigateTo(route: string): void {
    this.router.navigate([ route ]);
  }

  onSelect(id: string): void {
    this.router.navigate([ '/polls/vote', id ]);
  }

}
