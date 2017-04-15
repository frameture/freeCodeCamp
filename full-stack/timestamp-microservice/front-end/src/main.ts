import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
