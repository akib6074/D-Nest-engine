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
export class CreateItsmAllReqStatusDto {
@IsNumber()
@IsOptional()
name:number;

@IsString()
@IsOptional()
type:string;

@IsString()
@IsOptional()
description:string;

}