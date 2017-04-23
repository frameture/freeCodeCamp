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

  errorInfo: string;
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

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
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
        if (!res.success) {
          this.errorInfo = res.message;
          return;
        }
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

  private resetForm(): void {
    this.errorInfo = '';
    this.form.reset({
      username: '',
      password: ''
    });
  }

}
