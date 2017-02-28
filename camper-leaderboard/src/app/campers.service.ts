import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CampersService {
  private readonly ENDPOINT_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/';
  private readonly ALLTIME_URL  = 'alltime';
  private readonly RECENT_URL   = 'recent';

  constructor(private http: Http) { }

  public getRecentCampers(): Promise<JSON> {
    const URL = this.ENDPOINT_URL + this.RECENT_URL;
    return this.http.get(URL).toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  public getAlltimeCampers(): Promise<JSON> {
    const URL = this.ENDPOINT_URL + this.ALLTIME_URL;
    return this.http.get(URL).toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(response: any): Promise<JSON> {
    return Promise.resolve(<JSON>response.json());
  }

  private handleError(error: any) {
    // TODO
    console.log(error);
  }
}
