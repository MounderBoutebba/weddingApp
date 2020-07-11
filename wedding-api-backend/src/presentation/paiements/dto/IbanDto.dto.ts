import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IbanDto {

    @ApiProperty()
    @IsNotEmpty()
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

    @ApiProperty()
    @IsNotEmpty()
	iban: string;

    @ApiProperty()
    @IsNotEmpty()
    currency: string;

    @ApiProperty()
    @IsNotEmpty()
	name: string;

}
