import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';

@Injectable()
export class AuthService {

  private loggedIn: boolean;

  constructor(
    private be: BackendService,
    private us: UserService,
  ) { }

  isLoggedIn(): boolean {
    return this.loggedIn || false;
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };

    return this.be
      .login(data)
      .map((res) => {
        if (!res.message) { this.us.setProfile(res); }
        return res;
      });
  }

  logout(): void {
    this.loggedIn = false;
  }
}
