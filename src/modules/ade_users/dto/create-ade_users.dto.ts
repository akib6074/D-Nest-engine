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
export class CreateAdeUsersDto {
  @IsString()
  user_name: string;

  @IsString()
  @IsOptional()
  user_name_bangla: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  role_id: number;

  @IsOptional()
  is_active: string;
}
