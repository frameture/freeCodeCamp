import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8080/server';

  constructor(private http: Http) { }

  register(data: User): Observable<any> {
    return this.http.post(this.URL + '/sign-up', { data });
  }

  login(data: User): Observable<any> {
    return this.http.post(this.URL + '/login', { data });
  }

}
