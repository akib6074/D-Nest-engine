/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateAdeAttributesDto {
  @IsString()
  attribute_name: string;

  @IsString()
  attribute_name_bn: string;

  @IsString()
  attribute_type: string;

  @IsBoolean()
  @IsOptional()
  primaryKey: boolean;

  @IsBoolean()
  @IsOptional()
  foreignKey: boolean;

  @IsNumber()
  @IsOptional()
  foreign_table_id: number;

  @IsNumber()
  @IsOptional()
  ade_table_id: number;
}
