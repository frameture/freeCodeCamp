import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserWinsComponent } from './user-wins.component';
import { AuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UserWinsComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule { }
