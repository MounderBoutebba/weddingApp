import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { Option } from '../models/option.model';
import { share, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class OptionService {
	constructor(private readonly http: HttpClient) {}

	public findOption(companyId: string, email: string, id: string): Observable<Option> {
		return this.http.get<Option>(`${environment.apiUrl}/users/${email}/company/${companyId}/option/${id}`)
      .pipe(share());
  }

	public deleteOption(companyId: string, id: string, email: string): Observable<object> {
		return this.http.delete(`${environment.apiUrl}/users/${email}/company/${companyId}/option/${id}`);
	}

	public putOption(companyId: string, id: string, email: string, data: any): Observable<Option> {
		return this.http.put<Option>(`${environment.apiUrl}/users/${email}/company/${companyId}/option/${id}`, data);
	}

    public postOption(companyId: string, email: string, data: any): Observable<Option> {
		return this.http.post<Option>(`${environment.apiUrl}/users/${email}/company/${companyId}/option`, data);
	}
}
