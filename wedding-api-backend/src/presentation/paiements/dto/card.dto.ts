import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CardDto {
	/**
	 * Two digit number representing the card's expiration month.
	 */
	@ApiProperty()
	// tslint:disable-next-line: variable-name
	exp_month: number;

	/**
	 * Two or four digit number representing the card's expiration year.
	 */
	@ApiProperty()
	// tslint:disable-next-line: variable-name
	exp_year: number;

	/**
	 * The card number, as a string without any separators.
	 */
	@ApiProperty()
	number: string;

	/**
	 * Card security code. Required unless your account is registered in
	 * Australia, Canada, or the United States. Highly recommended to always
	 * include this value.
	 */
	@ApiPropertyOptional()
	cvc?: string;

	/**
	 * Cardholder's full name.
	 */
	@ApiPropertyOptional()
	name?: string;
}
