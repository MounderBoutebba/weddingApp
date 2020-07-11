import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {

	@ApiProperty()
	@IsBoolean()
	public seen: boolean;
}
