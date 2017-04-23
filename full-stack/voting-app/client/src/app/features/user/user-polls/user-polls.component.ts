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

  onTweet(pollId: string): void {
    const url = 'https://twitter.com/intent/tweet?text=Vote%20in%20my%20poll:%20https://voting-app-full-stack.herokuapp.com/polls/vote/';
    window.location.replace(url + pollId);
  }

  private getPolls(): void {
    this.pollService
      .getUserPolls()
      .subscribe(polls => this.polls = polls);
  }

}
