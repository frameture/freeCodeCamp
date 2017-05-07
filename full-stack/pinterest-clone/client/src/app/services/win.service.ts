import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BackendService } from './backend.service';
import { UserService } from './user.service';

@Injectable()
export class WinService {

  constructor(
    private backendService: BackendService,
    private userService: UserService
  ) { }

  addWin(title: string, link: string): Observable<any> {
    const username = this.userService.getUserProfile().username;
    return this.backendService
      .addWin(username, title, link)
      .map(res => this.mapResponse(res));
  }

  removeWin(winId: string): Observable<any> {
    const username = this.userService.getUserProfile().username;
    return this.backendService
      .removeWin(username, winId)
      .map(res => this.mapResponse(res));
  }

  private mapResponse(res): any {
    if (!res.message) { this.userService.setUserProfile(res); }
    return res;
  }
}
