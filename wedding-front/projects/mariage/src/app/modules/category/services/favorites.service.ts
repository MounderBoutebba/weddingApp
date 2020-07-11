import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private readonly http: HttpClient) {
  }

    public getFavories(email: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}/users/${email}/user-favorites`);
    }

  public addFavorites(userEmail: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${userEmail}/user-favorites`, data);
  }

  public deleteFavorites(userEmail: string, companyId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${userEmail}/user-favorites/${companyId}`);
  }



}
