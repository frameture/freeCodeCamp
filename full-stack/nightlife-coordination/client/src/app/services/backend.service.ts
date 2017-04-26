import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackendService {

  private readonly URL = '/api';

  constructor(private http: Http) { }

  setBar(venueId: string, clientId: string): Observable<any> {
    const data = { venueId, clientId };
    return this.http.post(`${ this.URL }/set-venue`, { data });
  }

  getBars(location: string): Observable<any> {
    return this.http.get(`${ this.URL }/bars/${ location }`);
  }

  getProfile(profile: string): Observable<any> {
    return this.http.get(`${ this.URL }/${ profile }`);
  }

  setProfile(clientId: string): Observable<any> {
    const data = { clientId };
    return this.http.post(`${ this.URL }/profile`, { data });
  }

}
