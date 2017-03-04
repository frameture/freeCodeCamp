import { Component } from '@angular/core';

import { GameService } from '../game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private gameService: GameService) { }

  private changeSize(size: string): void {
    this.gameService.size = GameService.SIZES[size];
  }

  private changeSpeed(speed: string): void {
    this.gameService.speed = GameService.SPEEDS[speed];
  }

}
