export interface Card {
	/**
	 * Two digit number representing the card's expiration month.
	 */
	exp_month: number;

	/**
	 * Two or four digit number representing the card's expiration year.
	 */
	exp_year: number;

	/**
	 * The card number, as a string without any separators.
	 */
	number: string;

	/**
	 * Card security code. Required unless your account is registered in
	 * Australia, Canada, or the United States. Highly recommended to always
	 * include this value.
	 */
	cvc?: string;

	/**
	 * Cardholder's full name.
	 */
	name?: string;
}
