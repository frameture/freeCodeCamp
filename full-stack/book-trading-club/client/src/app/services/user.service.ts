import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private user: User;

  constructor(private be: BackendService) { }

  getProfile(): User {
    return this.user;
  }

  updateProfile(user: User): Observable<any> {
    return this.be
      .update(user)
      .map((res) => {
        if (!res.message) { this.setProfile(res); }
        return res;
      });
  }

  setProfile(user: User): void {
    this.user = user;
  }
}
