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
  Matches,
} from 'class-validator';
export class ResetPasswordDto {
  @IsNotEmpty()
  current_password: string;

  @IsNotEmpty()
  @MinLength(8)
  new_password: string;
}
