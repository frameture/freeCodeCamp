import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Timestamp } from './timestamp';

@Injectable()
export class BackendService {
  private readonly URL = 'https://timestamp-srv.herokuapp.com/';

  constructor(private http: Http) { }

  getTimestamp(input: string): Observable<any> {
    return this.http.get(this.URL + input);
  }

}
