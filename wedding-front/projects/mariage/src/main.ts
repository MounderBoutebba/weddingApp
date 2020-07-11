import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments';
import { hmrBootstrap } from './hmr';
import * as moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');
if (environment.production) {
  console.log = () => {};
  console.group = () => {};
  console.table = () => {};
  console.debug = () => {};
  console.warn = () => {};
  console.error = () => {};
	enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  const bootstrap = () => 	platformBrowserDynamic().bootstrapModule(AppModule);
  if (environment.hmr) {
    if (module[ 'hot' ]) {
      hmrBootstrap(module, bootstrap);
    } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
    }
  } else {
    bootstrap().catch(err => console.log(err));
  }
});
