import { passBoolean } from 'protractor/built/util';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8080/api'; // TODO

  constructor(private http: Http) { }

  addWin(username: string, title: string, link: string): Observable<any> {
    const data = { username, title, link };
    return this.http
      .post(this.URL + '/add-win', { data })
      .map(res => this.extractData(res));
  }

  getWins(): Observable<any> {
    return this.http
      .get(this.URL + '/wins')
      .map(res => this.extractData(res));
  }

  likeWin(username: string, winOwner: string, winId: string): Observable<any> {
    const data = { username, winOwner, winId, like: true };
    return this.http
      .post(this.URL + '/like-unlike', { data })
      .map(res => this.extractData(res));
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http
      .post(this.URL + '/login', { data })
      .map(res => this.extractData(res));
  }

  unlikeWin(username: string, winOwner: string, winId: string): Observable<any> {
    const data = { username, winOwner, winId };
    return this.http
      .post(this.URL + '/like-unlike', { data })
      .map(res => this.extractData(res));
  }

  removeWin(username: string, winId: string): Observable<any> {
    const data = { username, winId };
    return this.http
      .post(this.URL + '/remove-win', { data })
      .map(res => this.extractData(res));
  }

  signUp(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http
      .post(this.URL + '/sign-up', { data })
      .map(res => this.extractData(res));
  }

  private extractData(res: Response): JSON | string {
    if (res.json && res.json()) {
      return res.json();
    }
    return res.statusText;
  }
}
