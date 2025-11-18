import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from '../../products/schemas/product.schema';

export class StockDto {
  @ApiProperty({ example: 'A-03-B' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ enum: ProductStatus })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  productStatus: ProductStatus;

  @ApiProperty({ example: '2027-12-31T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  expiryDate: Date;

  @ApiProperty({ example: '2025-05-10T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  manufactureDate?: Date;

  @ApiProperty({ example: 45 })
  @IsNotEmpty()
  @IsNumber()
  available: number;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  reserved: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  min: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  max: number;
}
