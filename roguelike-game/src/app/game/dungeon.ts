import { Collectable, Health, Weapon } from './collectable';
import { Identifiable, Identity } from './identifiable';
import { Player } from './player';
import { Enemy } from './enemy';
import { Legend } from './legend';
import { Location } from './location';

import { Grid } from './grid';

export class Dungeon {

  private _gridNumber: number;
  private _grid: string[];
  private _legend: Legend;
  private _board: Identifiable[][];
  private _player: Player;
  private _darkness: boolean;
  private _darknessRadius = 2;

  constructor(player: Player) {
    this._legend = new Legend();
    this._player = player;
    this.loadGrid(0);
  }

  public toggleDarkness(): void {
    if (!this._darkness) {
      this._darkness = true;
      this.darken();
    } else {
      this._darkness = false;
      this.darken(true);
    }
  }

  private darken(lighten?: boolean) {
    const r = this._darknessRadius;
    const row = this._player.location.y;
    const col = this._player.location.x;

    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[ 0 ].length; j++) {
        const cell = this._board[ i ][ j ];
        if (lighten) {
          Identity.changeIsDark(cell.identity, false);
          continue;
        }
        if (i > row + r || i < row - r || j > col + r || j < col - r) {
          Identity.changeIsDark(cell.identity, true);
        } else {
          Identity.changeIsDark(cell.identity, false);
        }
      }
    }
  }

  private loadGrid(gridNumber: number): void {
    this._gridNumber = gridNumber;
    this._grid = new Grid(this._gridNumber).grid;
    this.scatterItems();
    this.renderBoard();
    this._darkness = false;
    this.toggleDarkness();
  }

  private scatterItems(): void {
    const spaces: Location[] = this.getShuffledSpaces();
    const itemsQuantity = Math.round(Math.random() * (spaces.length * .3));
    const items: string[] = this.divideItems(itemsQuantity);

    while (items.length) {
      this.injectItem(items.pop(), spaces.pop());
    }
  }

  private getShuffledSpaces(): Location[] {
    const spaces = this.findSpaces();
    this.shuffle(spaces);
    return spaces;
  }

  private findSpaces(): Location[] {
    const spaces = new Array<Location>();
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[ 0 ].length; j++) {
        const sign = this._grid[ i ][ j ];
        if (sign === ' ') {
          spaces.push(new Location(j, i));
        }
      }
    }
    return spaces;
  }

  private divideItems(quantity: number): string[] {
    const items: string[] = [];
    items.push('w');

    while (items.length < quantity) {
      const random = Math.random();
      if (random < .35) {
        items.push('h');
      } else {
        items.push('e');
      }
    }
    return items;
  }

  private shuffle(items: Location[]): void {
    for (let i = 0; i < items.length; i++) {
      const random = Math.floor(Math.random() * items.length);
      const temp = items[ random ];
      items[ random ] = items[ 0 ];
      items[ 0 ] = temp;
    }
  }

  private injectItem(item: string, where: Location): void {
    const row = this._grid[ where.y ];
    this._grid[ where.y ] = row.slice(0, where.x) + item
      + row.slice(where.x + 1);
  }

  private renderBoard(): void {
    const board = new Array<Array<Identifiable>>();

    for (let i = 0; i < this._grid.length; i++) {
      const row = new Array<Identifiable>();
      for (let j = 0; j < this._grid[ 0 ].length; j++) {
        const sign = this._grid[ i ][ j ];
        let id: Identifiable = this._legend.createIdentifiable(sign,
          this._player.level, this._gridNumber);
        if (id.identity.isPlayer) {
          id = this.switchPlayer(<Player>id, j, i);
        }
        row.push(id);
      }
      board.push(row);
    }
    this._board = board;
  }

  private switchPlayer(p: Player, x: number, y: number): Player {
    this._player.location.setLocation(x, y);
    return this._player;
  }

  public moveElement(oldLoc: Location, newLoc: Location): void {
    const id: Identifiable = this._board[ newLoc.y ][ newLoc.x ];
    let collected: boolean;

    if (id.identity.isNext) {
      this.loadGrid(this._gridNumber + 1);
    } else if (
      id instanceof Health ||
      id instanceof Weapon ||
      id instanceof Enemy) {
      collected = id.action(this._player);
    }

    if (collected || id.identity.isSpace) {
      this.move(oldLoc, newLoc);
    }
  }

  private move(oldLoc: Location, newLoc: Location) {
    const temp = this._board[ oldLoc.y ][ oldLoc.x ];
    this._board[ oldLoc.y ][ oldLoc.x ] = { identity: { isSpace: true } };
    this._board[ newLoc.y ][ newLoc.x ] = temp;
    this._player.location = newLoc;
    if (this._darkness) {
      this.moveDarkness(oldLoc, newLoc);
    }
  }

  private moveDarkness(oldLoc: Location, newLoc: Location): void {
    this.darken();
  }

  get board() {
    return this._board;
  }

  get dungeonNumber() {
    return this._gridNumber;
  }

}
