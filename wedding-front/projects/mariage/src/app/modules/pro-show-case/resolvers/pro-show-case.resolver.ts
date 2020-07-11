import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CompanyService } from '../../user/services/company.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Company } from '../../user/models/company.model';

@Injectable({ providedIn: 'root' })
export class ProShowCaseResolver implements Resolve<Company> {
    constructor(private readonly companyService: CompanyService){}
    resolve(route: ActivatedRouteSnapshot): Observable<Company> {
        const email = route.paramMap.get('email');
		const category = route.paramMap.get('category');
		console.log('ProShowCaseResolver', email, category);
		return this.companyService.getServiceByEmailAndServiceReservation(email, category).pipe(
			catchError(err => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 404) {
						return of<Company>(new Company());
					}
				}
				return throwError(err);
			})
		);
    }
}