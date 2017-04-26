import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route, state): boolean {
    if (!this.authService.authenticated()) {
      this.authService.login();
    }
    return this.authService.authenticated();
  }

}
