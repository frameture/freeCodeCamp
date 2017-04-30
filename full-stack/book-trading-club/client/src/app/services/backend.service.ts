import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = 'http://localhost:8080/api';

  constructor(private http: Http) { }

  addBook(data): Observable<any> {
    return this.http
      .post(this.URL + '/add-book', { data })
      .map(res => this.extractData(res));
  }

  getProfile(id: string): Observable<any> {
    return this.http
      .get(this.URL + '/user/' + id)
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

  private extractData(res) {
    return res.json();
  }
}
