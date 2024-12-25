import {
  BaseResponse,
  Pagination,
  PagingResponse,
} from '../dto/params-response.dto';

export function paginate<T>(
  items: T[],
  totalItems: number,
  page: number,
  pageSize: number,
  message: string = 'Operation successful',
): BaseResponse<PagingResponse<T>> {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const pagination: Pagination = {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };

  return {
    message,
    success: true,
    status: 'OK',
    data: { items, pagination },
  };
}
