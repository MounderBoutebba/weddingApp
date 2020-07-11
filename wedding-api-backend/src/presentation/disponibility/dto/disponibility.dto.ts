import { IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DiponibilityType } from '../../../infrastructure/databases/entities/disponibility.entity';

export class CreateDisponibilityDto {

  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  @ApiProperty({ enum: DiponibilityType })
  @IsEnum(DiponibilityType)
  type: DiponibilityType;

}
