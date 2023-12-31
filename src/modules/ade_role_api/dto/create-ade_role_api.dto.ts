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
export class CreateAdeRoleApiDto {
  @IsNumber()
  @IsOptional()
  role_id: number;

  @IsNumber()
  @IsOptional()
  api_id: number;
}
