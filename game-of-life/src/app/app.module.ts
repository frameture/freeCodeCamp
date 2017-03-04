import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

import { GameService }            from './game.service';
import { GridComponent }          from './grid/grid.component';
import { StateControlsComponent } from './state-controls/state-controls.component';
import { SettingsComponent }      from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    StateControlsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ GameService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
