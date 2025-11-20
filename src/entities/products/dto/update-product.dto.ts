import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DetailsDto } from './details.dto';
import { DimensionsDto } from './dimensions.dto';
import { StockDto } from './stock.dto';
import { ValueDto } from './value.dto';
import { AvailabilityEnum } from 'src/common/enums/availability.enum';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'SN-ABC789' })
  @IsOptional()
  @IsString()
  readonly serialNumberSKU?: string;

  @ApiProperty({ example: 'Notebook Dell XPS 13' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({ example: 'Ultrabook' })
  @IsOptional()
  @IsString()
  readonly subcategory?: string;

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
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => StockDto)
  readonly stock: StockDto;

  @ApiProperty({ type: ValueDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ValueDto)
  readonly value: ValueDto;

  @ApiProperty({ type: DetailsDto })
  @IsOptional()
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
  @IsOptional()
  @IsEnum(AvailabilityEnum)
  readonly availability: AvailabilityEnum;
}
