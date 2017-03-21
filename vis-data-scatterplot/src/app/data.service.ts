import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';



@Injectable()
export class DataService {
  private readonly url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return this.http
      .get(this.url)
      .map(this.extractData);
  }

  private extractData(response): Observable<JSON> {
    return response.json();
  }

}
