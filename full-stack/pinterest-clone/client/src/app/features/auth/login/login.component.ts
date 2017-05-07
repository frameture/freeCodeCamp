import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  errorInfo: string;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(): void {
    this.authService
      .login(this.getControl('username'), this.getControl('password'))
      .subscribe((res) => {
        if (res.message) { return this.errorInfo = res.message; }
        this.router.navigate([ '/' ]);
      });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  private getControl(control: string): string {
    return this.form.get(control).value;
  }

}
