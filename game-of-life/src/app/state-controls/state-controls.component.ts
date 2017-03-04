import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-state-controls',
  templateUrl: './state-controls.component.html',
  styleUrls: [ './state-controls.component.css' ]
})
export class StateControlsComponent implements OnInit {

  constructor(private gameService: GameService) { }

  get generation() {
    return this.gameService.generation;
  }

  ngOnInit() {
    this.start();
  }

  private start(): void {
    this.gameService.startGame();
  }

  private pause(): void {
    this.gameService.pauseGame();
  }

  private clear(): void {
    this.gameService.clearGame();
  }

}
