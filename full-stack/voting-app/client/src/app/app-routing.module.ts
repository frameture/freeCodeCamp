import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from "app/components/home/home.component";

const routes: Routes = [
  {
    path: 'sign-up',
    loadChildren: 'app/sign-up/sign-up.module.ts#SignUpModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module.ts#LoginModule'
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
