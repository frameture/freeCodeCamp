import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from 'app/services/backend.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private loggedIn = false;
  private username: string;

  constructor(private be: BackendService) { }

  getUsername(): string {
    if (this.loggedIn) { return this.username; }
    return null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(data: User): Observable<any> {
    return this.be
      .login(data)
      .map(res => this.handleLoginResponse(res, data.username));
  }

  logout(): void {
    this.loggedIn = false;
  }

  private handleLoginResponse(res, username: string) {
    res = res.json();
    if (res.success) {
      this.loggedIn = true;
      this.username = username;
    }
    return res;
  }

}
