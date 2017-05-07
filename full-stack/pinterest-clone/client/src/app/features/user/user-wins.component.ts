import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserProfile } from '../../models/user-profile';
import { Win } from '../../models/win';
import { UserService } from '../../services/user.service';
import { WinService } from '../../services/win.service';

@Component({
  templateUrl: './user-wins.component.html',
  styleUrls: [ './user-wins.component.scss' ]
})
export class UserWinsComponent {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private winService: WinService
  ) { }

  get userProfile() {
    return this.userService.getUserProfile();
  }

  get wins() {
    return this.userProfile.wins;
  }

  onRemoveWin(winId: string): void {
    this.winService
      .removeWin(winId)
      .subscribe();
  }

}
