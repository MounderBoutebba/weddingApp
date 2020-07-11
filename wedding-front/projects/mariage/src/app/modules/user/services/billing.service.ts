import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { CompanyBilling } from '../models/companyBilling.model';
import { share, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BillingService {
	constructor(private readonly http: HttpClient) {}

	public findCompanyBilling(id: string, email: string, ): Observable<CompanyBilling> {
		return this.http.get<CompanyBilling>(`${environment.apiUrl}/users/${email}/company/${id}/billing`)
      .pipe(share());
  }

	public putCompanyBilling(id: string, companyId: string, email: string, data: any): Observable<CompanyBilling> {
		return this.http.put<CompanyBilling>(`${environment.apiUrl}/users/${email}/company/${companyId}/billing/${id}`, data);
	}

	public postCompanyBilling(companyId: string, email: string, data: any): Observable<CompanyBilling> {
		return this.http.post<CompanyBilling>(`${environment.apiUrl}/users/${email}/company/${companyId}/billing`, data);
	}
}
