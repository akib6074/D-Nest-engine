/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmUniqueIdDto } from './create-itsm_unique_id.dto';
export class UpdateItsmUniqueIdDto extends PartialType(CreateItsmUniqueIdDto) {}
    