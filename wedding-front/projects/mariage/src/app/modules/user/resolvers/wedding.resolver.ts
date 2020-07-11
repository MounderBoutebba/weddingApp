import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Wedding } from '../models/wedding.model';
import { WeddingService } from '../services/wedding.service';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeddingResolver implements Resolve<Wedding> {

  constructor(private readonly weddingService: WeddingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Wedding> | Wedding {
    const email = route.paramMap.get('email');
    return this.weddingService.find(email).pipe(
      catchError(
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              return of<Wedding>(new Wedding());
            }
          }
          return throwError(err);
        }
      )
    );

  }
}
