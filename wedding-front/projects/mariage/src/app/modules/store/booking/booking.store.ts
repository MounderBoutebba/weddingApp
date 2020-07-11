import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { BookingState } from './booking.state';
import { BookingAction, BookingStoreInterface } from './booking.action';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class BookingStore  extends ObservableStore<BookingState> implements BookingStoreInterface {
    constructor() {
        super({
            trackStateHistory: true,
            logStateChanges: !environment.production
          });
          this.init();
    }
    init() {
        const initialState: BookingState = {
            bookingObj: {},
            bookingDate: {startDate: new Date(), endDate: new Date()},
        }
        this.setState(initialState, BookingAction.INIT_STATE);
    }
    setBookingObj(obj: any) {
      this.setState({ ...this.getState(), bookingObj: obj }, BookingAction.SET_BOOKING_OBJ);
      localStorage.setItem('bookingObj', JSON.stringify(this.getCurrentBookingObj()));
    }
    setBookingDate(bookingDate: {startDate: Date, endDate: Date}) {
      this.setState({ ...this.getState(), bookingDate }, BookingAction.SET_BOOKING_DATE);
      localStorage.setItem('bookingDate', JSON.stringify(this.getCurrentBookingDate()));
    }
    getCurrentBookingObj(): any {
        return this.getState().bookingObj;
    }
    getCurrentBookingDate(): {startDate: Date, endDate: Date} {
        return this.getState().bookingDate;
    }
}
