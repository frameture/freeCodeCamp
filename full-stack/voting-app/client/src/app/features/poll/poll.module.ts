import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PollListComponent } from './poll-list/poll-list.component';
import { PollRoutingModule } from './poll-routing.module';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PollRoutingModule
  ],
  declarations: [
    PollListComponent,
    PollVoteComponent
  ]
})
export class PollModule { }
