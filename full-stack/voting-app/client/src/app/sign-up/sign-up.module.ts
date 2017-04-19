import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    SignUpRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ SignUpComponent ]
})
export class SignUpModule { }
