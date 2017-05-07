import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinsComponent } from './wins.component';
import { AuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ], component: WinsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WinsRoutingModule { }
