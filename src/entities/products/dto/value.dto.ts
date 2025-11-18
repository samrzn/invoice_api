import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ValueDto {
  @ApiProperty({ example: 3200.99 })
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty({ example: 4499.9 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'BRL' })
  @IsOptional()
  @IsISO4217CurrencyCode()
  currency?: string;

  @ApiProperty({ example: ['ICMS', 'PIS', 'COFINS'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  taxes: string[];

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  refundable: boolean;
}
