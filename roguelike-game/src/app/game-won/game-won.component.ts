import { Component } from '@angular/core';

import { GameInteractionService } from '../game-interaction.service';

@Component({
  selector: 'app-game-won',
  templateUrl: './game-won.component.html'
})
export class GameWonComponent {

  constructor(private gameInteractionService: GameInteractionService) { }

  private reset(): void {
    this.gameInteractionService.playerDied();
  }
}
