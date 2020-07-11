import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { environment } from '../environments';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WidgetModule } from './modules/widget/widget.module';
import { QuicklinkModule } from 'ngx-quicklink';
import { CoreModule } from './core/core.module';
import { AgmCoreModule } from '@agm/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MarkdownModule } from 'ngx-markdown';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
registerLocaleData(localeFr, 'fr');
@NgModule({
	declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    HttpClientModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    WidgetModule,
    QuicklinkModule,
    CoreModule,
    MarkdownModule.forRoot(),
    AgmCoreModule.forRoot(
      {
        apiKey: environment.googleApiKey,
        libraries: ['places']
      }
    )
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
	bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
