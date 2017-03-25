import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

  constructor(private http: Http) { }

  getData(): Observable<JSON> {
    return this.http.get(this.url)
      .map(response => this.extractData(response));
  }

  private extractData(response: any): JSON {
    return response.json();
  }

}
