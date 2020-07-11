export interface PostBookingObj {
    providerID: string;
    cat: string;
    bookingDate: {
        startDate: Date;
        endDate: Date;
    };
    criteres: object;
    paymentType: number;
}
