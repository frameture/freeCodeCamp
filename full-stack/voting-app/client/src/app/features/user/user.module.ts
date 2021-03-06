import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UserPollsComponent } from './user-polls/user-polls.component';
import { UserRoutingModule } from './user-routing.module';
import { PollFormComponent } from './poll-form/poll-form.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PollFormComponent,
    UserPollsComponent
  ]
})
export class UserModule { }
