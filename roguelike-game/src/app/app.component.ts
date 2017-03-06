import { Component } from '@angular/core';

import { GameInteractionService } from './game-interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  constructor(private gameInteractionService: GameInteractionService) { }

}
