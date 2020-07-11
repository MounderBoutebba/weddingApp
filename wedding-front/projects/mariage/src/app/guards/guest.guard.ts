import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
              private readonly router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | boolean {
    const result = this.authService.isAuthenticated();
    if (result) {
      this.router.navigateByUrl('/');
    }
    return !result;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {this.router.navigate(['/']); }
    return !isAuth;
  }

}
