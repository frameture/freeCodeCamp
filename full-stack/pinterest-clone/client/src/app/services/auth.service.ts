import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  private loggedIn: boolean;

  constructor(
    private backendService: BackendService,
    private userService: UserService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return this.loggedIn || false;
  }

  login(username: string, password: string): Observable<any> {
    return this.backendService
      .login(username, password)
      .map((res) => {
        if (!res.message) {
          this.userService.setUserProfile(res);
          this.loggedIn = true;
        }
        return res;
      });
  }

  logout(): void {
    this.loggedIn = false;
    this.userService.setUserProfile(null);
    this.router.navigate([ '/' ]);
  }

  signUp(username: string, password: string): Observable<any> {
    return this.backendService
      .signUp(username, password)
      .map((res) => {
        if (!res.message) {
          this.loggedIn = true;
          this.userService.setUserProfile(res);
        }
        return res;
      });
  }
}
