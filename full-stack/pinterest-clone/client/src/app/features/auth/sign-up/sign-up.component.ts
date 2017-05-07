import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent implements OnInit {

  errorInfo: string;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    const controls = this.getControls();
    if (!controls) { return this.errorInfo = 'Passwords don\'t match'; }

    this.authService
      .signUp(controls.username, controls.password)
      .subscribe((res) => {
        if (res.message) { return this.errorInfo = res.message; }
        this.router.navigate([ '/' ]);
      });

  }

  onReset() {
    this.resetForm();
    this.errorInfo = '';
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: '',
      password: '',
      rePassword: ''
    });
  }

  private getControl(control: string) {
    return this.form.get(control).value;
  }

  private getControls() {
    const username = this.getControl('username');
    const password = this.getControl('password');
    const rePassword = this.getControl('rePassword');

    return (password === rePassword)
      ? { username, password }
      : false;
  }

  private resetForm(): void {
    this.form.reset({
      username: '',
      password: '',
      rePassword: ''
    });
  }

}
