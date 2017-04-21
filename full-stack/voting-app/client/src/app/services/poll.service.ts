import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';
import { UserService } from './user.service';
import { Poll } from '../models/poll';

@Injectable()
export class PollService {

  constructor(
    private be: BackendService,
    private us: UserService
  ) { }

  addPoll(poll: Poll): Observable<any> {
    return this.be
      .addPoll(poll, this.us.getUsername())
      .map(res => res.json());
  }

  getUserPolls(): Observable<Poll[]> {
    return this.be
      .getUserPolls(this.us.getUsername())
      .map(res => res.json() as Poll[]);
  }

  getPolls(): Observable<Poll[]> {
    return this.be
      .getPolls()
      .map(res => res.json() as Poll[]);
  }

}
