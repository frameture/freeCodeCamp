import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimestampComponent } from './timestamp/timestamp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: ':date', component: TimestampComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
