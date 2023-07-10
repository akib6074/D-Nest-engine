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
export class CreateItsmIncidentSubCategoriesDto {
@IsString()
@IsOptional()
name:string;

@IsString()
@IsOptional()
type:string;

@IsString()
@IsOptional()
description:string;

@IsNumber()
@IsOptional()
incident_category_id:number;
}