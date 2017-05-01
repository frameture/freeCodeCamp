import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule { }
