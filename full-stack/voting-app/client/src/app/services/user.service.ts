import { Injectable } from '@angular/core';
import { BackendService } from "app/services/backend.service";

@Injectable()
export class UserService {

  private loggedIn = false;

  constructor(private be: BackendService) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    console.log('us.login()');
  }

  logout(): void {
    console.log('us.logout()');
  }

}
