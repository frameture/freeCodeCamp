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

  customOption: string;
  errorInfo: string;
  poll: Poll;
  option: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollService: PollService
  ) { }

  isValid(): boolean {
    return (!!this.option || !!this.customOption) && !this.errorInfo;
  }

  ngOnInit() {
    this.route.params
      .switchMap(params => this.pollService.getPoll(params[ 'id' ]))
      .subscribe(poll => this.poll = poll);
  }

  onSubmit(): void {
    const option = this.customOption
      ? this.customOption
      : this.option;

    this.pollService
      .vote(option, this.poll._id)
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
