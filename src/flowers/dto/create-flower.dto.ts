import { ApiProperty } from '@nestjs/swagger';
import { Image } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFlowerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ example: 'Rose' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'A beautiful red rose', nullable: true })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'uuid()' })
  categoryId: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 200, default: 0 })
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 50, default: 0 })
  stock: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  status?: boolean = true;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: [{ id: 1, url: 'https://example.com/image.jpg', type: 'IMAGE' }],
  })
  images: Image[];
}
