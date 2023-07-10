/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeTablesDto } from './create-ade_tables.dto';
export class UpdateAdeTablesDto extends PartialType(CreateAdeTablesDto) {}
