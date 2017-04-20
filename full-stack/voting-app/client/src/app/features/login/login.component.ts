import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createTitle();
    this.createForm();
  }

  onLogout(): void {
    this.userService.logout();
  }

  onReset(): void {
    this.resetForm();
  }

  onSubmit(): void {
    console.log('submit');
    this.resetForm();
    this.router.navigate([ '/' ]);
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: '',
      password: ''
    });
  }

  private createTitle(): void {
    this.title = this.isLoggedIn()
      ? 'You are logged in.'
      : 'Login in to the Voting App';
  }

  private isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  private resetForm(): void {
    this.form.reset({
      username: '',
      password: ''
    });
  }

}
