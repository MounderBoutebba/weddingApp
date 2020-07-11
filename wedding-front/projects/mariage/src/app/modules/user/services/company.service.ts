import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { share, shareReplay } from 'rxjs/operators';
import { CompanyImage } from '../models/companyImage.model';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {
	constructor(private readonly http: HttpClient) {}

	public findCompany(id: string, email: string): Observable<Company> {
		return this.http.get<Company>(`${environment.apiUrl}/users/${email}/company/${id}`).pipe(share());
	}

	public findCompanyByEmail(email: string): Observable<Company> {
		return this.http.get<Company>(`${environment.apiUrl}/users/${email}/company/`).pipe(share());
	}

	public findAllCompanies(email): Observable<Company[]> {
		return this.http.get<Company[]>(`${environment.apiUrl}/users/${email}/company/all`).pipe(share());
	}

	public deleteCompany(id: string, email: string): Observable<object> {
		return this.http.delete(`${environment.apiUrl}/users/${email}/company/${id}`);
	}

	public deleteCompanyJobs(id: string, email: string): Observable<object> {
		return this.http.delete(`${environment.apiUrl}/users/${email}/company/${id}/jobs`);
	}

	public postCompanyJobs(email: string, company: any): Observable<object> {
		return this.http.post(`${environment.apiUrl}/users/${email}/company/${company.id}/jobs`, company);
	}

	public deleteImage(id: string, email: string, imageId: string): Observable<object> {
		return this.http.delete(`${environment.apiUrl}/users/${email}/company/${id}/images/${imageId}`);
	}

	public putCompany(id: string, email: string, data: any): Observable<Company> {
		return this.http.put<Company>(`${environment.apiUrl}/users/${email}/company/${id}`, data);
	}

	public updateCurrentStep(id: string, email: string, data: any): Observable<Company> {
		return this.http.put<Company>(`${environment.apiUrl}/users/${email}/company/${id}/current-step`, data);
	}

	public postCompany(email: string, data: any): Observable<Company> {
		return this.http.post<Company>(`${environment.apiUrl}/users/${email}/company`, data);
	}

	public changeFavoriteImages(
		email: string,
		companyId: string,
		id: string,
		data: Partial<CompanyImage>
	): Observable<CompanyImage[]> {
		return this.http.patch<CompanyImage[]>(
			`${environment.apiUrl}/users/${email}/company/${companyId}/images/${id}`,
			data
		);
	}

	public getServiceByEmailAndService(email: string, service: string): Observable<any> {
		return this.http.get<Company>(`${environment.apiUrl}/services/${service}/${email}`).pipe(share());
	}
	public getServiceByEmailAndServiceReservation(email: string, service: string): Observable<any> {
		return this.http.get<Company>(`${environment.apiUrl}/services/reservation/${service}/${email}`).pipe(share());
	}
	public putServiceByEmailAndService(categoryLabel: string, email: string, data: any): Observable<Company> {
		return this.http.patch<Company>(`${environment.apiUrl}/services/${categoryLabel}/${email}`, data);
	}
	public updateBankInfo(email: string, data: any): Observable<any> {
		return this.http.post(`${environment.apiUrl}/paiements/accounts/${email}`, data);
	}
	public getBankInfo(email: string): Observable<any> {
		return this.http.get(`${environment.apiUrl}/paiements/accounts/${email}`);
	}
	identityVerification(email: string, identityPrincipale: File, identitySecondary: File): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('identityPrincipale', identityPrincipale, identityPrincipale.name);
		formData.append('identitySecondary', identitySecondary, identitySecondary.name);
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		return this.http.post(`${environment.apiUrl}/paiements/accounts/identityverification/${email}`, formData, {
			headers
		});
	}
}
