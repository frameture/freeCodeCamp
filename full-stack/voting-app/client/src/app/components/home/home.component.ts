import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  info: string;
  username: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onNavigateTo(path: string): void {
    this.router.navigate([ path ]);
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.username = this.userService.getUsername();
    }
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
