import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent implements OnInit {

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
