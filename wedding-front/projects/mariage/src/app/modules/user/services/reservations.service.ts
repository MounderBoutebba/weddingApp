import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private event= new EventEmitter<any>();


  constructor(private readonly http: HttpClient) {
  }

  public emit(value){
    this.event.emit(value);
  }

  public getEmittedValues(){
    return this.event;
  }

  public getReservationRequestsProvider(page: number = 1) {
    if (page <= 0) {
      page = 0;
    } else {
      page = page - 1;
    }
    return this.http.get(`${environment.apiUrl}/booking/reservation/validated-request?page=${page}`);
  }

  public getReservationRequestsClient(page: number = 1) {
    if (page <= 0) {
      page = 0;
    } else {
      page = page - 1;
    }
    return this.http.get(`${environment.apiUrl}/booking/reservation/request-client?page=${page}`);
  }

  public getReservationRequestsValidatedByProvider(page: number = 1) {
    if (page <= 0) {
      page = 0;
    } else {
      page = page - 1;
    }
    return this.http.get(`${environment.apiUrl}/booking/reservation/validated-provider-request?page=${page}`);
  }

  public getReservationsConfirmedByClient(page: number = 1) {
    if (page <= 0) {
      page = 0;
    } else {
      page = page - 1;
    }
    return this.http.get(`${environment.apiUrl}/booking/reservation/payed-client-provider?page=${page}`);
  }

  public getReservationsPayedByClient(page: number = 1) {
    if (page <= 0) {
      page = 0;
    } else {
      page = page - 1;
    }
    return this.http.get(`${environment.apiUrl}/booking/reservation/finished-provider?page=${page}`);
  }

  public rejectReservationRequestByProvider(id: string) {
    return this.http.patch(`${environment.apiUrl}/booking/${id}/validate-provider`,
      { reservationsStatus: 'refused_by_provider' }
    );
  }

  public cancelRequestByProvider(id: string) {
    return this.http.patch(`${environment.apiUrl}/booking/${id}/cancel_request_provider`,
      { reservationsStatus: 'canceled_request_by_provider' }
    );
  }

  public cancelPendingRequestByClient(id: string) {
    return this.http.patch(`${environment.apiUrl}/booking/${id}/cancel-request-client`,
      { reservationsStatus: 'canceled_pending_by_client' }
    );
  }

  public cancelReservationByProvider(id: string) {
    return this.http.patch(`${environment.apiUrl}/booking/${id}/cancel_reservation_provider`,
      { reservationsStatus: 'canceled_reservation_by_provider' }
    );
  }

  public remindClient(reservationId: string,) {
    return this.http.post(`${environment.apiUrl}/booking/${reservationId}/remind-client-provider`,
      {}
    );
  }

  public validateReservationRequestByProvider(id: string,body:any) {
    return this.http.patch(`${environment.apiUrl}/booking/${id}/validate-provider`,
      { reservationsStatus: 'validated_by_provider',...body}
    );
  }


}
