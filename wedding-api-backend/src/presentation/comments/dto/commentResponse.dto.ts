import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {

	@ApiProperty()
	@Length(3, 600)
	public content: string;

}
