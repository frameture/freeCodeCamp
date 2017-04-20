import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from 'app/features/user/user.component';
import { UserPollsComponent } from 'app/features/user/user-polls/user-polls.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'polls', component: UserPollsComponent },
      { path: '', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
