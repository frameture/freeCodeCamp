import { isRegExp } from 'util';
import { Component, OnInit } from '@angular/core';

import { CampersService }    from './campers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:  ['./app.component.css']
})
export class AppComponent implements OnInit {
  private campers: JSON;
  private isRecent = true;

  constructor(private campersService: CampersService) { }

  ngOnInit(): void {
    this.getRecentCampers();
  }

  private getRecentCampers() {
    this.campersService.getRecentCampers()
      .then(response => this.campers = response);
    this.isRecent = true;
  }

  private getAlltimeCampers() {
    this.campersService.getAlltimeCampers()
      .then(response => this.campers = response);
    this.isRecent = false;
  }
}
