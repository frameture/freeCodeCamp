import { Identifiable } from './identifiable';
import { Player } from './player';
import { Enemy } from './enemy';
import { Legend } from './legend';
import { Location } from './location';

import { GRIDS } from './GRIDS';

export class Dungeon {

  private _gridNumber: number;
  private _grid: string[];
  private _legend: Legend;
  private _board: Identifiable[][];
  private _player: Player;

  constructor(player: Player) {
    this._gridNumber = 0;
    this._grid = GRIDS[ this._gridNumber ];
    this._legend = new Legend();
    this._player = player;
    this.renderBoard();
  }

  get board() {
    return this._board;
  }

  public moveElement(oldLoc: Location, newLoc: Location): void {
    const temp = this._board[ oldLoc.x ][ oldLoc.y ];
    this._board[ oldLoc.x ][ oldLoc.y ] = { className: 'space' };
    this._board[ newLoc.x ][ newLoc.y ] = temp;
  }

  private renderBoard(): void {
    const board = new Array<Array<Identifiable>>();

    for (let i = 0; i < this._grid.length; i++) {
      const row = new Array<Identifiable>();
      for (let j = 0; j < this._grid[ 0 ].length; j++) {
        const sign = this._grid[ i ][ j ];
        let identity = this._legend.createIdentifiable(sign,
          this._player.level);
        if (identity.className === 'player') {
          identity = this.switchPlayer(<Player>identity, i, j);
        }
        row.push(identity);
      }
      board.push(row);
    }
    this._board = board;
  }

  private switchPlayer(p: Player, x: number, y: number): Player {
    this._player.location.setLocation(x, y);
    return this._player;
  }

  get dungeonNumber() {
    return this._gridNumber;
  }

}
