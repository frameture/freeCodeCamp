import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimestampComponent } from 'app/timestamp/timestamp.component';
import { HomeComponent } from 'app/home/home.component';

const routes: Routes = [
  { path: ':date', component: TimestampComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
