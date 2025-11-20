import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ManufactureOriginEnum } from 'src/common/enums/manufacture-origin.enum';

export class DetailsDto {
  @ApiProperty({ example: 'TechMaster Importações LTDA' })
  @IsNotEmpty()
  @IsString()
  supplier: string;

  @ApiProperty({ example: '2025-10-20T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  lastIn: Date;

  @ApiProperty({ example: '2025-10-25T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  lastOut: Date;

  @ApiProperty({
    enum: ManufactureOriginEnum,
    example: ManufactureOriginEnum.IMPORTED,
  })
  @IsNotEmpty()
  @IsEnum(ManufactureOriginEnum)
  manufactureOrigin: ManufactureOriginEnum;

  @ApiProperty({ example: 'LCH-2025-078' })
  @IsNotEmpty()
  @IsString()
  batch: string;

  @ApiProperty({ example: 50 })
  @IsOptional()
  @IsNumber()
  unitsPerBatch?: number;

  @ApiProperty({ example: ['NBK001', 'NBK002'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skuInStock: string[];
}
