import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { debounceTime, share, shareReplay, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllByType(type: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/services/${type}`)
      .pipe(shareReplay(1));
  }

  public searchByQuery(queryBody: any, page: number = 1): Observable<any> {
    page = page - 1;
    return this.http.post(`${environment.apiUrl}/services/_search?page=${page}`, queryBody)
      .pipe(shareReplay(1),debounceTime(50000));
  }

  public findByUserId(categorielabel: any, email): Observable<any> {
    return this.http.get(`${environment.apiUrl}/services/${categorielabel}/${email}`)
      .pipe(shareReplay(1));
  }

}
