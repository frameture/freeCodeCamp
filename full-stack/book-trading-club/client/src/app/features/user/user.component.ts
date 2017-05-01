import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ]
})
export class UserComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getProfile();
    this.createForm();
  }

  onSubmit(): void {
    const controls = this.getControls();

    this.userService
      .updateProfile(controls)
      .subscribe((res) => {
        if (!res.message) { this.user = res; }
      });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      city: this.user.city || '',
      state: this.user.state || ''
    });
  }

  private getControls(): any {
    return {
      _id: this.user._id,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      city: this.form.get('city').value,
      state: this.form.get('state').value,
    };
  }

}
