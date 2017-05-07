import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';
import { UserProfile } from '../models/user-profile';

@Injectable()
export class UserService {

  private userProfile: UserProfile;

  constructor(private be: BackendService) { }

  getUserProfile(): UserProfile {
    return this.userProfile;
  }
// TODO
  // updateProfile(data): Observable<any> {
  //   return this.be
  //     .update(data)
  //     .map((res) => {
  //       if (!res.message) { this.setProfile(res); }
  //       return res;
  //     });
  // }

  setUserProfile(profile: UserProfile): void {
    this.userProfile = profile;
  }
}
