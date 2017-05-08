import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from      '@angular/core';
import { FormsModule } from   '@angular/forms';
import { HttpModule } from    '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from     './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from     './components/home/home.component';
import { AuthService } from    './services/auth.service';
import { AuthGuard } from      './services/auth-guard.service';
import { BackendService } from './services/backend.service';
import { UserService } from    './services/user.service';
import { WinService } from     './services/win.service';
import { WinsComponent } from  './components/wins/wins.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    WinsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    BackendService,
    UserService,
    WinService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
