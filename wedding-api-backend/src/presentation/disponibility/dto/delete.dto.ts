import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteDisponibilityDto {

  @ApiProperty()
  @IsUUID()
  id: string;

}
