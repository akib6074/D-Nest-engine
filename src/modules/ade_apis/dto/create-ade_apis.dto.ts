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
export class CreateAdeApisDto {
  @IsString()
  @IsOptional()
  api_path: string;

  @IsString()
  @IsOptional()
  api_method: string;

  @IsString()
  @IsOptional()
  table_name: string;

  @IsOptional()
  @IsNumber()
  menu_id: number;
}
