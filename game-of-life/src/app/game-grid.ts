import { GameService } from './game.service';

export class GameGrid {

  private size: number[];
  private cellsToChange = [];
  private _grid: boolean[][];
  private _generation: number;

  constructor(size: number[]) {
    this.fillGrid(size);
    this.size = size;
  }

  get grid() {
    return this._grid;
  }

  private fillGrid(size: number[], keepOldRef?: boolean): void {
    this._generation = 0;

    let grid;
    if (keepOldRef) {
      grid = this._grid;
    } else {
      grid = new Array<Array<boolean>>();
      this._grid = grid;
    }

    for (let i = 0; i < size[0]; i++) {
      const row: boolean[] = new Array<boolean>();
      for (let j = 0; j < size[1]; j++) {
        const isFilled = Math.random() > 0.5;
        row.push(isFilled);
      }
      grid.push(row);
    }
  }

  public changeSize(size: number[]): void {
    this.popOldCells();
    this.fillGrid(size, true);
    this.size = size;
  }

  private popOldCells(): void {
    while (this._grid.length) {
      this._grid.pop();
    }
  }

  public clearGame(): void {
    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this._grid[i][j] = false;
      }
    }
  }

  public changeCell(row: number, col: number): void {
    this.grid[row][col] = !this.grid[row][col];
  }

  public nextGeneration(): void {
    this._generation++;
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

  get generation() {
    return this._generation;
  }
}
