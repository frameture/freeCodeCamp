import { Injectable } from '@angular/core';

import { Game } from './game/game';
import { Player } from './game/player';

@Injectable()
export class GameService {

  private _game: Game;
  private _player: Player;

  constructor() {
    this._game = new Game();
    this._player = this._game.player;
  }

  // TODO  
  public movePlayer(direction: string): void {

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
