import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
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
