import { Length,IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {

	@ApiProperty()
	public qualiteService: number;

	@ApiProperty()
	@IsNumber()
	public professionnalisme: number;

	@ApiProperty()
	@IsNumber()
	public flexibilite: number;

	@ApiProperty()
	@IsNumber()
	public rapportQualitePrix: number;

	@ApiProperty()
	@Length(3, 600)
	public content: string;

	@ApiProperty()
	@IsUUID()
	reservationId: string;
}
