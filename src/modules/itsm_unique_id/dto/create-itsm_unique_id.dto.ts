/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  MaxLength,
  MinLength,
} from 'class-validator'
;
export class CreateItsmUniqueIdDto {
@IsString()
@IsOptional()
id_for:string;

@IsNumber()
@IsOptional()
id_length:number;

@IsString()
@IsOptional()
id_format:string;

@IsNumber()
@IsOptional()
starting_id:number;

@IsNumber()
@IsOptional()
last_gen_id:number;

@IsNumber()
@IsOptional()
reset_flag:number;

}