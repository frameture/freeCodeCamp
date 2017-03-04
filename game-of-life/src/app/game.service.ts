import { Injectable } from '@angular/core';

import { GameGrid } from './game-grid';

@Injectable()
export class GameService {

  public static readonly SIZES = {
    '50x30':  [50, 30],
    '70x50':  [70, 50],
    '100x80': [100, 80]
  };

  public static readonly SPEEDS = {
    'fast'  : 500,
    'medium': 1000,
    'slow':   2000
  };

  private _speed = GameService.SPEEDS['medium'];
  private grid = new GameGrid(GameService.SIZES['50x30']);
  private timer;
  private running: boolean;

  constructor() {
    this.startGame();
  }

  public startGame(): void {
    if (this.running) {
      return;
    }
    this.running = true;
    this.timer = setInterval(() => this.grid.nextGeneration(), this._speed);
  }

  public pauseGame(): void {
    if (!this.running) {
      return;
    }
    this.running = false;
    clearInterval(this.timer);
  }

  public clearGame(): void {
    this.grid.clearGame();
  }

  public changeCell(row: number, col: number): void {
    this.grid.changeCell(row, col);
  }

  get cells() {
    return this.grid.grid;
  }

  set size(size: number[]) {
    this.pauseGame();
    this.grid.changeSize(size);
  }

  set speed(speed: number) {
    this._speed = speed;
    if (this.running) {
      this.pauseGame();
      this.startGame();
    }
  }

  get generation() {
    return this.grid.generation;
  }
}
