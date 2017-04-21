import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Poll } from '../../../models/poll';
import { PollService } from '../../../services/poll.service';

@Component({
  templateUrl: './user-polls.component.html',
  styleUrls: [ './user-polls.component.scss' ]
})
export class UserPollsComponent implements OnInit {

  polls: Poll[];

  constructor(
    private pollService: PollService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pollService
      .getUserPolls()
      .subscribe(polls => this.polls = polls);
  }

  onNavigateTo(route: string): void {
    this.router.navigate([ route ]);
  }

}
