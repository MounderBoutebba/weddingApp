import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
	declarations: [],
	imports: [CommonModule],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }, {
    provide: JwtHelperService,
    useValue: new JwtHelperService()
  }]
})
export class CoreModule {}
