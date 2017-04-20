import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  info: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onNavigateTo(path: string): void {
    this.router.navigate([ path ]);
  }

  private isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }


}
