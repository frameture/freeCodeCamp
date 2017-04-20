import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpService {

  constructor(private be: BackendService) { }

  signUp(user: User): Observable<any> {
    return this.be.register(user);
  }

}
