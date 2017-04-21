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
      .map(res =>  res.json());
  }

}
