import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class DimensionsDto {
  @ApiProperty({ example: 1.75 })
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 2.1 })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty({ example: 35.8 })
  @IsOptional()
  @IsNumber()
  width: number;

  @ApiProperty({ example: 24.6 })
  @IsOptional()
  @IsNumber()
  depth: number;

  @ApiProperty({ example: 1.75 })
  @IsOptional()
  @IsNumber()
  volume: number;
}
