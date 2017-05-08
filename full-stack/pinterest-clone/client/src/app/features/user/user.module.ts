import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MasonryModule } from 'angular2-masonry';

import { UserWinsComponent } from './user-wins.component';
import { UserRoutingModule } from './user-routing.module';
import { WinFormComponent } from './win-form/win-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MasonryModule
  ],
  declarations: [
    UserWinsComponent,
    WinFormComponent
  ]
})
export class UserModule { }
