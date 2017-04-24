import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BackendService } from './backend.service';

@Injectable()
export class BarsService {

  constructor(private be: BackendService) { }

  getBars(location: string): Observable<any> {
    return this.be
      .getBars(location)
      .map(res => res.json());
  }
}
