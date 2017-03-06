import { Player } from './game/player';
import { Dungeon } from './game/dungeon';

import { Location } from './game/location';

export class GameService {

  private _player: Player;
  private _dungeon: Dungeon;

  constructor() {
    this._player = new Player(0, 0);
    this._dungeon = new Dungeon(this._player);
  }

  public movePlayer(direction: number): void {
    const oldLoc = this._player.location.copy();
    const newLoc = this._player.location.copy();

    switch (direction) {
      case Player.DIRECTIONS.up:
        newLoc.y--;
        break;
      case Player.DIRECTIONS.down:
        newLoc.y++;
        break;
      case Player.DIRECTIONS.left:
        newLoc.x--;
        break;
      case Player.DIRECTIONS.right:
        newLoc.x++;
        break;
      default: return;
    }
    console.log(direction, oldLoc, newLoc);
    this.move(oldLoc, newLoc);
  }

  private move(oldLoc: Location, newLoc: Location): void {
    this._dungeon.moveElement(oldLoc, newLoc);
  }

  get player() {
    return this._player;
  }

  get board() {
    return this._dungeon.board;
  }

  get dungeonNumber() {
    return this._dungeon.dungeonNumber;
  }

}
