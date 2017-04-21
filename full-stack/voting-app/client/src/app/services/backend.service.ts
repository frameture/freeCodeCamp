import { Poll } from '../models/poll';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8080/server';

  constructor(private http: Http) { }

  addPoll(poll: Poll, username: string): Observable<any> {
    const data = { poll, username };
    return this.http.post(this.URL + '/add-poll', { data });
  }

  getUserPolls(username: string): Observable<any> {
    return this.http.get(this.URL + '/polls/' + username);
  }

  getPolls(): Observable<any> {
    return this.http.get(this.URL + '/polls/');
  }

  register(data: User): Observable<any> {
    return this.http.post(this.URL + '/sign-up', { data });
  }

  login(data: User): Observable<any> {
    return this.http.post(this.URL + '/login', { data });
  }

}
