export interface Transaction {
    id: string;
    reservationId: string;
    transationType: TransactionType;
    date: Date;
}
export declare enum TransactionType {
    CLIENT_TO_BANK = 0,
    BANK_TO_CLIENT = 1,
    PROVIDER_TO_BANK = 2,
    BANK_TO_PROVIDER = 3
}
