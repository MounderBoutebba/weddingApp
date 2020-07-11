import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@NgModule({
	imports: [
	  AppModule,
    ServerModule,
    NoopAnimationsModule,
    FlexLayoutServerModule
  ],
	bootstrap: [AppComponent]
})
export class AppServerModule {}
