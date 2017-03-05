import { Player } from './player';
import { Dungeon } from './dungeon';

export class Game {

  private _player: Player;
  private _dungeon: Dungeon;

  constructor() {
    this._player = new Player(0, 0);
    this._dungeon = new Dungeon(this._player);
  }

  get player() {
    return this._player;
  }

  get dungeon() {
    return this._dungeon;
  }

  get dungeonNumber() {
    return this._dungeon.dungeonNumber;
  }

}
