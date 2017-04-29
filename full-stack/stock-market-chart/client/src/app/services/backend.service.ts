import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8181/api';

  constructor(private http: Http) { }

  getStock(query: string): Observable<any> {
    return this.http
      .get(`${ this.URL }/stock-data/${ query }`)
      .map((res: any) => {
        let body = res._body;
        body = body.substring(0, body.lastIndexOf('undefined'));
        return JSON.parse(body);
      });
  }

  getStocks(): Observable<any> {
    return this.http
      .get(`${ this.URL }/stocks`)
      .map(res => this.extractData(res));
  }

  addStock(stock: string): Observable<any> {
    return this.http
      .get(`${ this.URL }/stock-add/${ stock }`)
      .map(res => this.extractData(res));
  }

  removeStock(stock: string): Observable<any> {
    return this.http
      .get(`${ this.URL }/stock-remove/${ stock }`)
      .map(res => this.extractData(res));
  }

  private extractData(res) {
    return res.json();
  }

}
