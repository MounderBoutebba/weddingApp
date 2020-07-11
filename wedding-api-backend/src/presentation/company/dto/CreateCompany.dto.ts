import { IsUUID, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {

  /*@ApiProperty()
  @IsUUID()
  id: string;*/

  @ApiProperty()

  name: string;

  @ApiProperty()

  description: string;

  @ApiProperty()

  categories: string[];

  @ApiProperty()

  links: string[];

  @ApiProperty()

  questions: string;

  @ApiProperty()

  location: string;

  @ApiProperty()
  files: File[];

}
