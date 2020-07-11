import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CompanyDetailsResolver implements Resolve<any> {
	constructor(private readonly companyService: CompanyService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		const email = route.paramMap.get('email');
		const service = route.paramMap.get('service');
		console.log('resolver', email, service);
		return this.companyService.getServiceByEmailAndService(email, service).pipe(
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
