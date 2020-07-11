import { IsAlphanumeric, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {

	@ApiProperty()
	@IsAlphanumeric()
	public content: string;

	@ApiProperty()
	@IsAlphanumeric()
	public url: string;

	@ApiProperty()
	@IsUUID()
	public userId: string;

}
