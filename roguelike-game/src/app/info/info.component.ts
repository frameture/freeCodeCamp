import { Component } from '@angular/core';

import { GameInteractionService } from '../game-interaction.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: [ './info.component.css' ]
})
export class InfoComponent {

  constructor(private gameInteractionService: GameInteractionService) { }

  get health() {
    return this.gameInteractionService.health;
  }

  get weapon() {
    return this.gameInteractionService.weapon;
  }

  get attack() {
    return this.gameInteractionService.attack;
  }

  get level() {
    return this.gameInteractionService.level;
  }

  get nextLevel() {
    return this.gameInteractionService.nextLevelXp;
  }

  get xp() {
    return this.gameInteractionService.xp;
  }

}
