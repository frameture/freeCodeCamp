import { GameService } from './game.service';

export class GameGrid {

  private size: number[];
  private cellsToChange = [];
  private _grid: boolean[][];
  private _generation = 0;
  private _state = true;

  constructor(size: number[]) {
    this.fillGrid(size);
  }

  get grid() {
    return this._grid;
  }

  private fillGrid(size: number[]): void {
    const grid = new Array<Array<boolean>>();
    for (let i = 0; i < size[0]; i++) {
      const row: boolean[] = new Array<boolean>();
      for (let j = 0; j < size[1]; j++) {
        const isFilled = Math.random() > 0.75;
        row.push(isFilled);
      }
      grid.push(row);
    }
    this._grid = grid;
  }

  public changeCell(row: number, col: number): void {
    this.grid[row][col] = !this.grid[row][col];
  }

  public nextGeneration(): void {
    for (let i = 0; i < this.size[0]; i++) {
      for (let j = 0; j < this.size[1]; j++) {
        this.checkNeighbors(i, j);
      }
    }
    this.applyChanges();
  }

  private checkNeighbors(row: number, col: number): void {
    const cell = this.grid[row][col];
    const total = this.checkHorizontally(row, col)
                + this.checkVertically(row, col)
                + this.checkDiagonally(row, col);

    if (!cell && total === 3) {
      this.cellsToChange.push([row, col]);
    } else if (cell && (total < 2 || total > 3)) {
      this.cellsToChange.push([row, col]);
    }
  }

  private checkHorizontally(row: number, col: number): number {
    let neighs = 0;
    if (col !== 0 && this.grid[row][col - 1]) {
      neighs++;
    }
    if (col !== this.size[1] - 1 && this.grid[row][col + 1]) {
      neighs++;
    }
    return neighs;
  }

  private checkVertically(row: number, col: number): number {
    let neighs = 0;
    if (row !== 0 && this.grid[row - 1][col]) {
      neighs++;
    }
    if (row !== this.size[0] - 1 && this.grid[row + 1][col]) {
      neighs++;
    }
    return neighs;
  }

  private checkDiagonally(row: number, col: number): number {
    let neighs = 0;

    if (row !== 0 && col !== 0 && this.grid[row - 1][col - 1]) {
      neighs++; // check top left
    }
    if (row !== 0 && col !== this.size[1] - 1 && this.grid[row - 1][col + 1]) {
      neighs++; // check top right
    }
    if (row !== this.size[0] - 1 && col !== this.size[1] - 1
                                 && this.grid[row + 1][col + 1]) {
      neighs++; // check bottom right
    }
    if (row !== this.size[0] - 1 && col !== 0 && this.grid[row + 1][col - 1]) {
      neighs++; // check bottom left
    }

    return neighs;
  }

  private applyChanges() {
    while (this.cellsToChange.length !== 0) {
      const cell: number[] = this.cellsToChange.pop();
      this.changeCell(cell[0], cell[1]);
    }
  }

  get state() {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
  }

  get generation() {
    return this._generation;
  }
}
