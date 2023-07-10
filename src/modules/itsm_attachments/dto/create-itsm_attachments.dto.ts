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
export class CreateItsmAttachmentsDto {
@IsString()
@IsOptional()
mime_type:string;

@IsNumber()
@IsOptional()
size:number;

@IsString()
@IsOptional()
destination:string;

@IsString()
@IsOptional()
original_name:string;

@IsString()
@IsOptional()
url:string;

@IsString()
@IsOptional()
path:string;

@IsString()
@IsOptional()
options:string;

@IsNumber()
@IsOptional()
issue_id:number;
}