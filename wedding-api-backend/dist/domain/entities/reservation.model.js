"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["RESERVATION_REQUEST"] = "reservation_request";
    ReservationStatus["VALIDATED_BY_MARIAGESEREIN"] = "validated_by_mariageserein";
    ReservationStatus["REFUSED_BY_MARIAGESEREIN"] = "refused_by_mariageserein";
    ReservationStatus["ARCHIVED_BY_MARIAGESEREIN"] = "archived_by_mariageserein";
    ReservationStatus["VALIDATED_BY_PROVIDER"] = "validated_by_provider";
    ReservationStatus["REFUSED_BY_PROVIDER"] = "refused_by_provider";
    ReservationStatus["CANCELED_REQUEST_BY_PROVIDER"] = "canceled_request_by_provider";
    ReservationStatus["CANCELED_RESERVATION_BY_PROVIDER"] = "canceled_reservation_by_provider";
    ReservationStatus["VALIDATED_BY_CLIENT"] = "validated_by_client";
    ReservationStatus["REFUSED_BY_CLIENT"] = "refused_by_client";
    ReservationStatus["CANCELED_PENDING_BY_CLIENT"] = "canceled_pending_by_client";
    ReservationStatus["CANCELED_REQUEST_BY_CLIENT"] = "canceled_request_by_client";
    ReservationStatus["CANCELED_RESERVATION_BY_CLIENT"] = "canceled_reservation_by_client";
    ReservationStatus["PAYED_BY_CLIENT"] = "payed_by_client";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "cash";
    PaymentType["RECURRENCE"] = "recurrence";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));
//# sourceMappingURL=reservation.model.js.map