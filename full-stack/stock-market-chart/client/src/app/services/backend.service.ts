import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8080/api';

  constructor(private http: Http) { }

  getStock(query: string): Observable<any> {
    return this.http.get(`${ this.URL }/stock-data/${ query }`);
  }

}
