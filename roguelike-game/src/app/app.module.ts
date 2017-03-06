import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GameInteractionService } from './game-interaction.service';
import { GameService } from './game.service';
import { InfoComponent } from './info/info.component';
import { BoardComponent } from './board/board.component';
import { DeadPlayerInfoComponent } from './dead-player-info/dead-player-info.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    BoardComponent,
    DeadPlayerInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    GameInteractionService,
    GameService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
