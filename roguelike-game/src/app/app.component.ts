import { Component } from '@angular/core';

import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  constructor(private gameService: GameService) { }

  get diagnostic() {
    return JSON.stringify(this.gameService);
  }
}
