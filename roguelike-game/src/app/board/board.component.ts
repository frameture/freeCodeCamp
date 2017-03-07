import { Component } from '@angular/core';

import { GameInteractionService } from '../game-interaction.service';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.css' ]
})
export class BoardComponent {

  constructor(private gameInteractionService: GameInteractionService) { }

  get board() {
    return this.gameInteractionService.board;
  }

  get gameWon() {
    return this.gameInteractionService.gameWon;
  }

  @HostListener('window:keydown', [ '$event' ])
  keyboardInput(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.move(event.keyCode);
  }

  private move(direction: number): void {
    this.gameInteractionService.movePlayer(direction);
  }

  get playerAlive() {
    return this.gameInteractionService.health !== 0;
  }

}
