import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  private readonly url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return this.http.get(this.url)
      .map(this.extractData);
  }

  private extractData(response) {
    return response.json().data;
  }
}
