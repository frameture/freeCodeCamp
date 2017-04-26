import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';

@Injectable()
export class BarsService {

  constructor(
    private be: BackendService,
    private us: UserService
  ) { }

  getBars(location: string): Observable<any> {
    return this.be
      .getBars(location)
      .map(res => res.json());
  }

  setBar(venueId: string): Observable<any> {
    return this.be
      .setBar(venueId, this.us.getProfile())
      .map(res => res.json());
  }
}
