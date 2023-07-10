/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
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
  IsEnum,
  IsArray,
} from 'class-validator';
import { MatchApiFiles } from 'src/modules/common-services/match-file-api.decorator';

export class CreateItsmIssuesDto {
  @IsString()
  @IsOptional()
  service_id: string;

  // @IsNumber()
  @IsOptional()
  issue_type: number;

  @IsString()
  @IsOptional()
  service_details: string;

  @IsString()
  @IsOptional()
  custom_id: string;

  @IsString()
  @IsOptional()
  justification: string;

  // @IsNumber()
  @IsOptional()
  priority: number;

  @IsOptional()
  deadline: Date;

  @IsString()
  @IsOptional()
  additional_instruction: string;

  @IsString()
  @IsOptional()
  comments: string;

  // @IsNumber()
  @IsOptional()
  urgency: number;

  // @IsNumber()
  @IsOptional()
  service_category_id: number;

  // @IsNumber()
  @IsOptional()
  raised_for: number;

  // @IsNumber()
  @IsOptional()
  assignee: number;

  @MatchApiFiles({
    description: 'files',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  files: Express.Multer.File[];
}
