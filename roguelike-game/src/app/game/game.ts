import { Player } from './player';
import { Dungeon } from './dungeon';

export class Game {

  private _player: Player;
  private _dungeon: Dungeon;

  constructor() {
    this._player = new Player(0, 0);
    this._dungeon = new Dungeon(this._player);
  }

  public movePlayer(direction: number): void {
    console.log(direction);
    switch (direction) {
      case Player.DIRECTIONS.up:
        this.moveUp();
        break;
      case Player.DIRECTIONS.down:
        this.moveDown();
        break;
      case Player.DIRECTIONS.left:
        this.moveLeft();
        break;
      case Player.DIRECTIONS.right:
        this.moveRight();
        break;
      default: return;
    }
  }

  // TODO  
  private moveUp(): void {
    const oldLocation = this._player.location.copy();
    console.log('oldLocation', oldLocation);
    this._player.location.moveUp();
    const newLocation = this._player.location;
    console.log('newLocation', newLocation);
    this._dungeon.moveElement(oldLocation, newLocation);
    //const loc = this._player.location;
    // this.checkNeighbor
  }
  // TODO  
  private moveDown(): void {
    const oldLocation = this._player.location.copy();
    this._player.location.moveDown();
    const newLocation = this._player.location;
    this._dungeon.moveElement(oldLocation, newLocation);
    //const loc = this._player.location;
    // this.checkNeighbor
  }
  // TODO  
  private moveLeft(): void {
    const oldLocation = this._player.location.copy();
    this._player.location.moveLeft();
    const newLocation = this._player.location;
    this._dungeon.moveElement(oldLocation, newLocation);
    //const loc = this._player.location;
    // this.checkNeighbor
  }
  // TODO  
  private moveRight(): void {
    const oldLocation = this._player.location.copy();
    this._player.location.moveRight();
    const newLocation = this._player.location;
    this._dungeon.moveElement(oldLocation, newLocation);
    //const loc = this._player.location;
    // this.checkNeighbor
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
