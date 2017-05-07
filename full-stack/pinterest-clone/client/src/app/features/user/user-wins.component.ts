import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserProfile } from '../../models/user-profile';
import { Win } from '../../models/win';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-wins.component.html',
  styleUrls: [ './user-wins.component.scss' ]
})
export class UserWinsComponent implements OnInit {

  wins: Win[];
  userProfile: UserProfile;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.userProfile = this.userService.getUserProfile();
    this.wins = this.userProfile.wins;
  }

  // onSubmit(): void {
  //   const controls = this.getControls();

  //   this.userService
  //     .updateProfile(controls)
  //     .subscribe((res) => {
  //       if (!res.message) { this.userProfile = res; }
  //     });
  // }

}
