export enum BookingAction {
    INIT_STATE = 'init_state',
    SET_BOOKING_OBJ = 'set_booking_obj',
    SET_BOOKING_DATE = 'set_booking_date',
    GET_CURRENT_BOOKING_OBJ = 'get_current_booking_obj',
    GET_CURRENT_BOOKING_DATE = 'get_current_booking_date',
}
export interface BookingStoreInterface {
    setBookingObj(obj: any): void;
    setBookingDate(date: {startDate: Date, endDate: Date}): void;

    getCurrentBookingObj(): any;
    getCurrentBookingDate(): any;
}
