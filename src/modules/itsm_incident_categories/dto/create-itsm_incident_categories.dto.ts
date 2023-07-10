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
export class CreateItsmIncidentCategoriesDto {
@IsString()
@IsOptional()
name:string;

@IsString()
@IsOptional()
type:string;

@IsNumber()
@IsOptional()
description:number;

}