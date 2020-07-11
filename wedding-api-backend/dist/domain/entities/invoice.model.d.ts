export interface Invoice {
    id?: string;
    reservationId: string;
    status?: InvoiceStatus;
    typeExecution: TypeExecution;
    dateExecution: Date;
    montant: number;
    stripePaymentIntentId?: string;
}
export declare enum InvoiceStatus {
    requires_payment_method = "requires_payment_method",
    requires_confirmation = "requires_confirmation",
    requires_action = "requires_action",
    processing = "processing",
    requires_capture = "requires_capture",
    canceled = "canceled",
    succeeded = "succeeded"
}
export declare enum TypeExecution {
    differe = "differe",
    non_differe = "non_differe"
}
