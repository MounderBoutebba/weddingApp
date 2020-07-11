import { IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
	@ApiProperty()
	@IsUUID()
	id?: string;

	@ApiProperty()
	@Length(3, 300)
	msg: string;
}
