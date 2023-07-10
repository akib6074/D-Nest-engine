/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmIncidentSubCategoriesDto } from './create-itsm_incident_sub_categories.dto';
export class UpdateItsmIncidentSubCategoriesDto extends PartialType(CreateItsmIncidentSubCategoriesDto) {}
    