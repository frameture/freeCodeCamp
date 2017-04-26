import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth-guard.service';
import { BarsComponent } from './bars.component';

const routes: Routes = [
  {
    path: '', canActivate: [ AuthGuard ], children: [
      {
        path: ':location',
        component: BarsComponent
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class BarsRoutingModule { }
