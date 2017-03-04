import { Injectable } from '@angular/core';

import { GameGrid } from './game-grid';

@Injectable()
export class GameService {

  public static readonly SIZES = {
    'test':   [5, 3],
    '50x30':  [50, 30],
    '70x50':  [70, 50],
    '100x80': [100, 80]
  };

  private gridSize = GameService.SIZES['test'];
  private grid = new GameGrid(this.gridSize);
  private timer;

  constructor() {
    this.checkState();
  }

  private checkState(): void {
    if (this.grid.state) {
      this.startGame();
    }
  }

  public startGame(): void {
    this.timer = setInterval(() => this.grid.nextGeneration(), 500);
  }

  public pauseGame(): void {
    clearInterval(this.timer);
  }

  public setCell(row: number, col: number): void {
    this.grid.changeCell(row, col);
  }

  get cells() {
    return this.grid;
  }

  get size() {
    return this.gridSize;
  }

  set size(size: number[]) {
    this.gridSize = size;
    this.grid = new Grid(size);
  }

  get state() {
    return this.grid.state;
  }

  set state(state: boolean) {
    this.grid.state = state;
  }

  get generation() {
    return this.grid.generation;
  }
}
