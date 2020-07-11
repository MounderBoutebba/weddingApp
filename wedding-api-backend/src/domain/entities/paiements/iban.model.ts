export interface Iban {
	type:
		| 'ach_credit_transfer'
		| 'ach_debit'
		| 'alipay'
		| 'bancontact'
		| 'card'
		| 'card_present'
		| 'eps'
		| 'giropay'
		| 'ideal'
		| 'multibanco'
		| 'p24'
		| 'sepa_debit'
		| 'sofort'
		| 'three_d_secure'
		| 'wechat';
	sepa_debit: {
		iban: string;
	};
	currency: string;
	owner: {
		name: string;
	};
}
