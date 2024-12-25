import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  description: string;

  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  status?: boolean = true;
}
