import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeddingService {

  constructor(private readonly http: HttpClient) {
  }

  public find(email: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/${email}/wedding/`)
      .pipe(share());
  }


  public patchWedding(id: string, email: string, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/users/${email}/wedding/${id}`, data);
  }

  public createWedding(email: string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/${email}/wedding`, data);
  }

}
