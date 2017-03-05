import { Component } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: [ './info.component.css' ]
})
export class InfoComponent {

  constructor(private gameService: GameService) { }

  get health() {
    return this.gameService.health;
  }

  get weapon() {
    return this.gameService.weapon;
  }

  get attack() {
    return this.gameService.attack;
  }

  get level() {
    return this.gameService.level;
  }

  get nextLevel() {
    return this.gameService.nextLevelXp;
  }

  get xp() {
    return this.gameService.xp;
  }

}
