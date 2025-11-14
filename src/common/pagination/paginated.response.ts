import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({ type: () => PaginationMeta })
  pagination: PaginationMeta;

  @ApiProperty({ isArray: true })
  data: T[];
}
