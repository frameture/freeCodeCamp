import { Component, OnInit } from '@angular/core';

import { GameInteractionService } from '../game-interaction.service';

@Component({
  selector: 'app-dead-player-info',
  templateUrl: './dead-player-info.component.html',
  styleUrls: [ './dead-player-info.component.css' ]
})
export class DeadPlayerInfoComponent implements OnInit {

  constructor(private gameInteractionService: GameInteractionService) { }

  ngOnInit() {
    setTimeout(() => this.resetGame(), 2000);
  }

  private resetGame(): void {
    this.gameInteractionService.playerDied();
  }

}
