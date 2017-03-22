import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Data } from './data';


@Injectable()
export class DataService {
  private url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
  private body;

  constructor(private http: Http) { }

  getData(): Observable<Data[]> {
    return this.http.get(this.url)
      .map(this.extractData);
  }

  private extractData(response: any): Data[] {
    this.body = response.json();
    return this.body[ 'monthlyVariance' ];
  }

}
