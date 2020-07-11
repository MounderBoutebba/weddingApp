import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { Setting } from '../models/setting.model';
import { share } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SettingService {
	constructor(private readonly http: HttpClient) {}

	public findSetting(companyId: string, email: string, id: string): Observable<Setting> {
    return this.http.get<Setting>(`${environment.apiUrl}/users/${email}/company/${companyId}/setting/${id}`)
      .pipe(share());
  }

	public deleteSetting(companyId: string, id: string, email: string): Observable<object> {
		return this.http.delete(`${environment.apiUrl}/users/${email}/company/${companyId}/setting/${id}`);
	}

	public putSetting(companyId: string, id: string, email: string, data: any): Observable<Setting> {
		return this.http.put<Setting>(`${environment.apiUrl}/users/${email}/company/${companyId}/setting/${id}`, data);
	}

    public postSetting(companyId: string, email: string, data: any): Observable<Setting> {
		return this.http.post<Setting>(`${environment.apiUrl}/users/${email}/company/${companyId}/setting`, data);
	}
}
