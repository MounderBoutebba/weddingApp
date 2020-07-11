import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private emitter: EventEmitter<User> = new EventEmitter<User>();

  constructor(private readonly http: HttpClient) { }

  public findUser(email: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${email}`)
      .pipe(shareReplay(1));
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users`)
      .pipe(shareReplay(1));
  }

  public patchUser(email: string, data: any): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${email}`, data);
  }

  public patchUserLastConnexion(email: string, data: any): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${email}/last-connexion`, data);
  }

  public changeProfilePhoto(email: string, data: any): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/users/${email}/photo`, data);
  }

  public createUser(role: string, data: any): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/${role}`, data);
  }

  public deleteUser(email: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${email}`);
  }

  public emit(user: User): void {
    this.emitter.emit(user);
  }

  public getEmitted(): EventEmitter<User> {
    return this.emitter;
  }

}
