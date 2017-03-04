import { Component, OnInit } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: [ './grid.component.css' ]
})
export class GridComponent implements OnInit {

  private grid: boolean[][];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGrid();
  }

  private getGrid(): void {
    this.grid = this.gameService.cells;
  }

  private changeCell(row: number, col: number): void {
    this.gameService.changeCell(row, col);
  }

}
