/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmServiceCategoriesDto } from './create-itsm_service_categories.dto';
export class UpdateItsmServiceCategoriesDto extends PartialType(CreateItsmServiceCategoriesDto) {}
    