import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class ParamsRequest {
  @ApiProperty({ required: false, description: 'Search keyword' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, default: 1, description: 'Page number' })
  @IsOptional()
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    required: false,
    default: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  pageSize?: number = 10;
}
