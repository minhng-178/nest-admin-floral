import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Pagination {
  @ApiProperty()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @Type(() => Number)
  pageSize: number;

  @ApiProperty()
  @Type(() => Number)
  totalItems: number;

  @ApiProperty()
  @Type(() => Number)
  totalPages: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;
}

export class PagingResponse<T> {
  @ApiProperty({ isArray: true })
  items: T[];

  @ApiProperty()
  pagination: Pagination;
}

export class BaseResponse<T> {
  @ApiProperty({ example: 'Operation successful' })
  message?: string;

  @ApiProperty({ example: true })
  success?: boolean;

  @ApiProperty({ example: 'OK' })
  status?: string;

  @ApiProperty()
  data: T;
}
