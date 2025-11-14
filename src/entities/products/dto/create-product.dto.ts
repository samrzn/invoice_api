import {
  Availability,
  Category,
  Details,
  Dimensions,
  Stock,
  Value,
} from '../../products/schemas/product.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  readonly product_id: string;

  @ApiPropertyOptional({ example: 'SN-ABC789' })
  readonly serialNumberSKU?: string;

  @ApiProperty({ example: '7894900011517' })
  readonly EANCode: string;

  @ApiProperty({ example: 'Notebook Dell XPS 13' })
  readonly name: string;

  @ApiProperty({
    enum: Category,
    example: Category.ELECTRONICS,
  })
  readonly category: Category;

  @ApiPropertyOptional({ example: 'Ultrabook' })
  readonly subcategory?: string;

  @ApiProperty({ example: 'Dell' })
  readonly brand: string;

  @ApiProperty({ example: 'XPS 13 - 9340' })
  readonly model: string;

  @ApiPropertyOptional({
    example: 'Notebook premium com tela 4K e processador Intel de 14ª geração.',
  })
  readonly description?: string;

  @ApiProperty({ type: Dimensions })
  readonly dimensions: Dimensions;

  @ApiProperty({ type: Stock })
  readonly stock: Stock;

  @ApiProperty({ type: Value })
  readonly value: Value;

  @ApiProperty({ type: Details })
  readonly details: Details;

  @ApiPropertyOptional({
    example: [{ url: 'https://example.com/product.jpg' }],
  })
  readonly images?: object[];

  @ApiPropertyOptional({
    example: ['notebook', 'dell', 'xps', 'premium'],
  })
  readonly tags: string[];

  @ApiProperty({
    enum: Availability,
    example: Availability.AVAILABLE,
  })
  readonly availability: Availability;
}
