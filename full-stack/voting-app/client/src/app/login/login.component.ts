import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
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

  private resetForm(): void {
    this.form.reset({
      username: '',
      password: ''
    });
  }

}
