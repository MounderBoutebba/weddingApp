import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { AuthStore } from '../modules/store/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private authStore: AuthStore
	) {}

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		if (this.authService.isAuthenticated()) {
			if (!next.data.roles) {
				return of(true);
			}
			return of(this.authStore.getUser().role === next.data.roles);
		}
		this.router.navigateByUrl('/');
		return of(false);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
	}

	canLoad(route: Route): boolean {
		if (this.authService.isAuthenticated()) {
			return true;
		}
		this.router.navigate(['/']);
		return false;
	}
}
