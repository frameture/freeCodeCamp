import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';
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
    this.createTitle();
  }

  onNavigateTo(path: string): void {
    this.router.navigate([ path ]);
  }

  onReset(): void {
    this.resetForm();
  }

  onSubmit(): void {
    if (this.userService.isLoggedIn()) { return; }

    const user = this.getControls();
    this.userService
      .login(user)
      .subscribe((res) => {
        this.resetForm();
        this.onNavigateTo('/');
      });
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


  private getControls(): User {
    const user = new User(
      this.form.get('username').value,
      this.form.get('password').value,
    );
    return user;
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
