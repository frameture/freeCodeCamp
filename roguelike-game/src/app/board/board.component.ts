import { Component } from '@angular/core';

import { GameService } from '../game.service';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.css' ]
})
export class BoardComponent {

  constructor(private gameService: GameService) { }

  get board() {
    return this.gameService.board;
  }

  @HostListener('window:keydown', [ '$event' ])
  keyboardInput(event: KeyboardEvent) {
    this.move(event.keyCode);
  }

  private move(direction: number): void {
    this.gameService.movePlayer(direction);
  }

}
