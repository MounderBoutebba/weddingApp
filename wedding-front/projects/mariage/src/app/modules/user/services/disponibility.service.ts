import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class DisponibilityService {

  constructor(private readonly http: HttpClient) {
  }

  public deleteAbsence(email: string, companyId: string, id: string) {
    return this.http.delete(
      `${environment.apiUrl}/users/${email}/company/${companyId}/disponibility/${id}`
    );
  }

  public createAbsence(email: string, companyId: string,body:any) {
    return this.http.post(
      `${environment.apiUrl}/users/${email}/company/${companyId}/disponibility`,
      body
    );
  }


}
