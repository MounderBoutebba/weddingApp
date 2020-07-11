import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BankAccountDto {
	@ApiProperty()
	// tslint:disable-next-line: variable-name
	country: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	currency: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	account_holder_name: string;

	// individual or company
	@ApiPropertyOptional()
	// tslint:disable-next-line: variable-name
	account_holder_type: string;

	@ApiPropertyOptional()
	// tslint:disable-next-line: variable-name
	account_number: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	address: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	bank_name: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	firstname: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	lastname: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	postalCode: number;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	dateOfBirth: string;

	@ApiProperty()
	// tslint:disable-next-line: variable-name
	city: string;
}
