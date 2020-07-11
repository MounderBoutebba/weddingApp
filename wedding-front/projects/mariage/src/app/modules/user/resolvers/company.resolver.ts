import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthStore } from '../../store/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<Company> {


  constructor(
    private readonly companyService: CompanyService,
    private readonly authStore: AuthStore
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
    const email= this.authStore.getUser().email;
    //  const email = route.paramMap.get('email');
    return this.companyService.findCompanyByEmail(email).pipe(
      catchError(
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              return of<Company>(new Company());
            }
          }
          return throwError(err);
        }
      )
    );
  }
}
