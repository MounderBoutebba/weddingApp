"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["RESERVATION_REQUEST"] = "reservation_request";
    ReservationStatus["VALIDATED_BY_wedding"] = "validated_by_wedding";
    ReservationStatus["REFUSED_BY_wedding"] = "refused_by_wedding";
    ReservationStatus["ARCHIVED_BY_wedding"] = "archived_by_wedding";
    ReservationStatus["VALIDATED_BY_PROVIDER_AND_PAYMENT_REQUEST"] = "validated_by_provider_and_payment_request";
    ReservationStatus["CANCELLED_BY_CLIENT"] = "cancelled_by_client";
    ReservationStatus["PAYED_BY_CLIENT"] = "payed_by_client"; // client
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "cash";
    PaymentType["RECURRENCE"] = "recurrence";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
