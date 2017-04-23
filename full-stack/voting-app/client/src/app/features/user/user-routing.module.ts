import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserPollsComponent } from 'app/features/user/user-polls/user-polls.component';
import { PollFormComponent } from 'app/features/user/poll-form/poll-form.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'new-poll', component: PollFormComponent },
      { path: 'polls', component: UserPollsComponent },
      { path: '', redirectTo: '/polls', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
