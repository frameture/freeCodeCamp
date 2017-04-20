import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpService } from 'app/services/sign-up.service';
import { User } from '../../models/user';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent implements OnInit {

  errorInfo: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signUpService: SignUpService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onReset(): void {
    this.resetForm();
  }

  onSubmit(): void {
    const user = this.getControls();
    console.log('user', user);
    if (!user) {
      this.errorInfo = 'Passwords must be identical';
      return;
    }

    this.signUpService.signUp(user)
      .subscribe((res) => {
        this.resetForm();
        this.router.navigate([ '/' ]);
      }, (err) => {
          const error = JSON.parse(err._body);
          this.errorInfo = error.message;
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: '',
      password: '',
      rePassword: ''
    });
  }

  private getControls(): User {
    const user = new User(
      this.form.get('username').value,
      this.form.get('password').value,
      this.form.get('rePassword').value
    );
    return user.isPasswordIdentical() ? user : null;
  }

  private resetForm(): void {
    this.errorInfo = '';
    this.form.reset({
      username: '',
      password: '',
      rePassword: ''
    });
  }

}
