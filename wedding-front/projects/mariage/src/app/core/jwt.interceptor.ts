import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from '../modules/store/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private injector: Injector) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authStore = this.injector.get(AuthStore);

		if (request.url.includes('https://cms-api-dot-mariage-serein-2019.ew.r.appspot.com')) {
			return next.handle(request);
		}
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${authStore.getToken()}`,
				Email: `${authStore?.getUser()?.email}`
			}
		});

		return next.handle(request);
		/*        .pipe(
          retryWhen((errors) => {
            return errors
            .pipe(
            //  takeUntil(timer(1000 * 30 +1)),
            //  delay(1000 * 30)
            )
          })
        );*/
	}
}
