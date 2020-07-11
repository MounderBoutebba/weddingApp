export interface Transaction {
	id: string;
	reservationId: string;
	transationType: TransactionType;
	date: Date;
}

export enum TransactionType {
	CLIENT_TO_BANK,
	BANK_TO_CLIENT,
	PROVIDER_TO_BANK,
	BANK_TO_PROVIDER
	// TO DO another type
}
