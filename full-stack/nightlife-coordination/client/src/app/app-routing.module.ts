import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { HomeComponent } from 'app/components/home/home.component';

const routes: Routes = [
  { path: 'bars', loadChildren: 'app/features/bars/bars.module.ts#BarsModule' },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
