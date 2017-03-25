import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private readonly MAP_URL = 'https://d3js.org/world-50m.v1.json';
  private readonly METEORITE_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

  constructor(private http: Http) { }

  getMeteoriteData(): Observable<JSON> {
    return this.http.get(this.METEORITE_URL)
      .map(response => this.extractData(response));
  }

  getMapData(): Observable<JSON> {
    return this.http.get(this.MAP_URL)
      .map(response => this.extractData(response));
  }

  private extractData(response: any): JSON {
    return response.json();
  }

}
