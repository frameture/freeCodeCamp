import { Injectable } from '@angular/core';

import { Player } from './game/player';

import { GameService } from './game.service';


@Injectable()
export class GameInteractionService {

  private _player: Player;

  constructor(private gameService: GameService) {
    this._player = this.gameService.player;
  }

  public movePlayer(direction: number): void {
    this.gameService.movePlayer(direction);
  }

  get board() {
    return this.gameService.board;
  }

  get level() {
    return this._player.level;
  }

  get xp() {
    return this._player.xp;
  }

  get nextLevelXp() {
    return this._player.nextLevelXp;
  }

  get weapon() {
    return this._player.weapon;
  }

  get attack() {
    return this._player.attack;
  }

  get health() {
    return this._player.health;
  }

  private playerDied(): void {
    // TODO if hp === 0
  }

}
