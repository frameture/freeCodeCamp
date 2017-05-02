import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = '/api';

  constructor(private http: Http) { }

  acceptRequest(reqId, username): Observable<any> {
    const data = { reqId, username };
    return this.http
      .post(this.URL + '/accept-request', { data })
      .map(res => this.extractData(res));
  }

  addBook(data): Observable<any> {
    return this.http
      .post(this.URL + '/add-book', { data })
      .map(res => this.extractData(res));
  }

  addRequest(bookId: string, username: string): Observable<any> {
    const data = { bookId, username };
    return this.http
      .post(this.URL + '/add-request', { data })
      .map(res => this.extractData(res));
  }

  getProfile(id: string): Observable<any> {
    return this.http
      .get(this.URL + '/user/' + id)
      .map(res => this.extractData(res));
  }

  getBook(bookId: string): Observable<any> {
    return this.http
      .get(this.URL + '/book/' + bookId)
      .map(res => this.extractData(res));
  }

  getBooks(): Observable<any> {
    return this.http
      .get(this.URL + '/books')
      .map(res => this.extractData(res));
  }

  signUp(data): Observable<any> {
    return this.http
      .post(this.URL + '/sign-up', { data })
      .map(res => this.extractData(res));
  }

  login(data): Observable<any> {
    return this.http
      .post(this.URL + '/login', { data })
      .map(res => this.extractData(res));
  }

  update(data): Observable<any> {
    return this.http
      .post(this.URL + '/update-profile', { data })
      .map(res => this.extractData(res));
  }

  removeBook(username: string, bookId: string): Observable<any> {
    const data = { username, bookId };
    return this.http
      .post(this.URL + '/remove-book', { data })
      .map(res => this.extractData(res));
  }

  private extractData(res) {
    return res.json();
  }
}
