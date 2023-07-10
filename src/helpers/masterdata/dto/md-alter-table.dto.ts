/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDecimal,
  IsDate,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

class addColumn {
  @IsString()
  @IsOptional()
  columnName: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsBoolean()
  @IsOptional()
  allowNull: boolean;

  @IsOptional()
  defaultValue: any;

  @IsBoolean()
  @IsOptional()
  primaryKey: boolean;

  @IsBoolean()
  @IsOptional()
  autoIncrement: boolean;

  @IsString()
  @IsOptional()
  comment: string;
}

class changeColumn {
  @IsString()
  @IsOptional()
  columnName: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsBoolean()
  @IsOptional()
  allowNull: boolean;

  @IsOptional()
  defaultValue: any;

  @IsBoolean()
  @IsOptional()
  primaryKey: boolean;

  @IsBoolean()
  @IsOptional()
  autoIncrement: boolean;

  @IsString()
  @IsOptional()
  comment: string;
}

class renameColumn {
  @IsString()
  @IsOptional()
  columnName: string;

  @IsString()
  @IsOptional()
  newColumnName: string;
}

class removeColumn {
  @IsString()
  @IsOptional()
  columnName: string;
}

export class MDAlterTableDto {
  tableName: string;

  addColumns: boolean;

  @ApiProperty({
    isArray: true,
    type: addColumn,
  })
  columnsToAdd: addColumn[];

  changeColumns: boolean;

  @ApiProperty({
    isArray: true,
    type: changeColumn,
  })
  columnsToChange: changeColumn[];

  renameColumns: boolean;

  @ApiProperty({
    isArray: true,
    type: renameColumn,
  })
  columnsToRename: renameColumn[];

  removeColumns: boolean;

  @ApiProperty({
    isArray: true,
    type: removeColumn,
  })
  columnsToRemove: removeColumn[];
}
