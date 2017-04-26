import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { CLIENT_ID, DOMAIN } from '../../environments/.env';
import { UserService } from './user.service';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  private lock;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.lock = new Auth0Lock(CLIENT_ID, DOMAIN, {});

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (err, profile) => {
        if (err) { return console.error(err); }
        this.userService.setProfile(profile.clientID);
      });
    });
  }

  login(): void {
    this.lock.show();
  }

  authenticated(): boolean {
    return tokenNotExpired('id_token');
  }

  logout(): void {
    localStorage.removeItem('id_token');
    this.router.navigate([ '/' ]);
  }

}
