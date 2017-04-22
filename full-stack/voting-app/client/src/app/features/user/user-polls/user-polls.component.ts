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
    this.getPolls();
  }

  onNavigateTo(route: string): void {
    this.router.navigate([ route ]);
  }

  onRemove(pollId: string): void {
    this.pollService
      .remove(pollId)
      .subscribe(res => this.getPolls());
  }

  private getPolls(): void {
    this.pollService
      .getUserPolls()
      .subscribe(polls => this.polls = polls);
  }

}
