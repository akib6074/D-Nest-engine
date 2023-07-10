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
export class CreateAdeMastersDto {
  @IsString()
  slug_name: string;

  @IsString()
  icon_class: string;

  @IsOptional()
  heading_name: string[];

  @IsOptional()
  heading_name_bn: string[];

  @IsString()
  @IsOptional()
  slug_type: string;

  @IsOptional()
  query_tables: tableList[];

  @IsOptional()
  primaryTable: primaryTableDef;

  @IsOptional()
  relatedTables: relatedTablesDef[];

  @IsOptional()
  create_params: string;

  @IsOptional()
  update_params: string;

  @IsOptional()
  target_table: string;
}

class fieldDef {
  fieldName: string;
  columnName: string;
  columnNameBn: string;
  fieldType: string;
  foreignKey: boolean;
  foreign_table_id: number;
  include: boolean;
  sortOrder: number;
}

class tableList {
  tableName: string;

  @IsString()
  @IsOptional()
  dropdownField: string;

  fieldList: fieldDef[];
}

interface fieldDefCreate {
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  fieldLabelBn: string;
  foreignKey: boolean;
  foreign_table_id: number;
  include: boolean;
  isRequired: boolean;
  sortOrder: number;
}
interface primaryTableDef {
  tableName: string;
  fieldList: fieldDefCreate[];
}

interface relatedTablesDef {
  tableName: string;
  dropdownField: string;
  fieldList: fieldDefCreate[];
}
