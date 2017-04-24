import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarsComponent } from './bars.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: BarsComponent }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class BarsRoutingModule { }
