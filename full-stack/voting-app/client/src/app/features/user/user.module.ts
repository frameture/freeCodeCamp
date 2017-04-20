import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserPollsComponent } from './user-polls/user-polls.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, UserPollsComponent]
})
export class UserModule { }
