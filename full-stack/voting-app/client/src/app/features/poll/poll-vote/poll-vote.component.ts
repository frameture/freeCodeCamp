import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { Poll } from '../../../models/poll';
import { PollService } from '../../../services/poll.service';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: [ './poll-vote.component.scss' ]
})
export class PollVoteComponent implements OnInit {

  errorInfo: string;
  poll: Poll;
  option: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.pollService.getPoll(params[ 'id' ]))
      .subscribe(poll => this.poll = poll);
  }

  onSubmit(): void {
    this.pollService
      .vote(this.option, this.poll._id)
      .subscribe(res => this.handleResponse(res));
  }

  private handleResponse(res): void {
    if (!res.success) {
     return this.errorInfo = res.message;
    }
    this.errorInfo = '';
    this.router.navigate([ '/polls' ]);
  }

}
