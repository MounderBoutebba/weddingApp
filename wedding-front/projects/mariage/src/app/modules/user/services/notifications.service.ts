import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';
import { Observable } from 'rxjs';
import { delay, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationCountStream: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly http: HttpClient) { }

  public emitNotificationsCount(count: number): void {
    this.notificationCountStream.emit(count);
  }

  public getEmittedNotificationsCount(): EventEmitter<number> {
    return this.notificationCountStream;
  }

  public getNotificationsCount(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/unseen`)
      .pipe(retryWhen((errors) => errors.pipe(delay(1000 * 30))));
  }

  public getAllNotifications(page: number) {
    return this.http.get(`${environment.apiUrl}/notifications?page=${page}`);
  }

  public markAllAsSeen() {
    return this.http.put(`${environment.apiUrl}/notifications/mark-all-seen`, {});
  }

  public markNotificationAsSeen(id: string) {
    return this.http.patch(`${environment.apiUrl}/notifications/${id}`, {
      seen: true
    });

  }

  public markNotificationAsUnseen(id: string) {
    return this.http.patch(`${environment.apiUrl}/notifications/${id}`, {
      seen: false
    });
  }

}
