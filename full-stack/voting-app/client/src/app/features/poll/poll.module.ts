import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { ChartComponent } from './chart/chart.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollRoutingModule } from './poll-routing.module';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2GoogleChartsModule,
    PollRoutingModule,
  ],
  declarations: [
    PollListComponent,
    PollVoteComponent,
    ChartComponent
  ]
})
export class PollModule { }
