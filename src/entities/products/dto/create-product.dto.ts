import { Type } from 'class-transformer';
import {
  IsEAN,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DimensionsDto } from './dimensions.dto';
import { StockDto } from './stock.dto';
import { ValueDto } from './value.dto';
import { DetailsDto } from './details.dto';
import { AvailabilityEnum } from 'src/common/enums/availability.enum';
import { CategoryEnum } from 'src/common/enums/category.enum';

export class CreateProductDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  @IsNotEmpty()
  @IsString()
  readonly product_id: string;

  @ApiPropertyOptional({ example: 'SN-ABC789' })
  @IsOptional()
  @IsString()
  readonly serialNumberSKU?: string;

  @ApiProperty({ example: '7894900011517' })
  @IsNotEmpty()
  @IsEAN()
  readonly EANCode: string;

  @ApiProperty({ example: 'Notebook Dell XPS 13' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ELECTRONICS,
  })
  @IsNotEmpty()
  @IsEnum(CategoryEnum)
  readonly category: CategoryEnum;

  @ApiPropertyOptional({ example: 'Ultrabook' })
  @IsOptional()
  @IsString()
  readonly subcategory?: string;

  @ApiProperty({ example: 'Dell' })
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: 'XPS 13 - 9340' })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @ApiPropertyOptional({
    example: 'Notebook premium com tela 4K e processador Intel de 14ª geração.',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ type: DimensionsDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DimensionsDto)
  readonly dimensions: DimensionsDto;

  @ApiProperty({ type: StockDto })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => StockDto)
  readonly stock: StockDto;

  @ApiProperty({ type: ValueDto })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ValueDto)
  readonly value: ValueDto;

  @ApiProperty({ type: DetailsDto })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DetailsDto)
  readonly details: DetailsDto;

  @ApiPropertyOptional({
    example: [{ url: 'https://example.com/product.jpg' }],
  })
  @IsOptional()
  @IsArray()
  readonly images?: object[];

  @ApiPropertyOptional({
    example: ['notebook', 'dell', 'xps', 'premium'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @ApiProperty({
    enum: AvailabilityEnum,
    example: AvailabilityEnum.AVAILABLE,
  })
  @IsNotEmpty()
  @IsEnum(AvailabilityEnum)
  readonly availability: AvailabilityEnum;
}
