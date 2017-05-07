import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';

@Injectable()
export class WinService {

  constructor(private be: BackendService) { }
}
