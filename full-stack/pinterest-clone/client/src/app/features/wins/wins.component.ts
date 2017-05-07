import { Component, OnInit } from '@angular/core';

import { Win } from '../../models/win';
import { UserService } from '../../services/user.service';
import { WinService } from '../../services/win.service';

@Component({
  templateUrl: './wins.component.html',
  styleUrls: [ './wins.component.scss' ]
})
export class WinsComponent implements OnInit {

  wins: Win[];

  constructor(
    private userService: UserService,
    private winService: WinService
  ) { }

  ngOnInit() {
    this.winService
      .getWins()
      .subscribe(res => this.wins = res);
  }

  onLike(winOwner: string, winId: string, index: number): void {
    this.winService
      .like(winOwner, winId)
      .subscribe(res => this.wins[ index ] = res);
  }

  onUnlike(winOwner: string, winId: string, index: number): void {
    this.winService
      .unlike(winOwner, winId)
      .subscribe(res => this.wins[ index ] = res);
  }

  isNotOwnWin(userId: string): boolean {
    const ownId = this.userService.getUserProfile()._id;
    return ownId !== userId;
  }

  isLiked(likes: string[]): boolean {
    const username = this.userService.getUserProfile().username;
    return likes.indexOf(username) >= 0;
  }

}
