import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollListComponent } from './poll-list/poll-list.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'list', component: PollListComponent },
      { path: 'vote/:id', component: PollVoteComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PollRoutingModule { }
