import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Search keyword "name" to filter products',
  })
  keyword?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Page number',
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Items per page',
    example: 10,
  })
  limit?: number;
}
