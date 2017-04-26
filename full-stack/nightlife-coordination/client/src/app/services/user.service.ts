import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';

@Injectable()
export class UserService {

  constructor(private be: BackendService) { }

  setProfile(clientId: string): void {
    localStorage.setItem('app_client_id', clientId);

    this.be
      .setProfile(clientId)
      .subscribe();
  }

  getProfile(): string {
    return localStorage.getItem('app_client_id');
  }
}
