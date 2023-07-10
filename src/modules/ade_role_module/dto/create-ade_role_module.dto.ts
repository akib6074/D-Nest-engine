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
export class CreateAdeRoleModuleDto {
  @IsNumber()
  accesible: number;

  @IsNumber()
  ade_roles_id: number;

  @IsNumber()
  ade_modules_id: number;
}
