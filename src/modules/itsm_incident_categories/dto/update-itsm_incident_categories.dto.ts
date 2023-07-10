/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmIncidentCategoriesDto } from './create-itsm_incident_categories.dto';
export class UpdateItsmIncidentCategoriesDto extends PartialType(CreateItsmIncidentCategoriesDto) {}
    