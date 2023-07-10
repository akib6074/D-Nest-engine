/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeAttributesDto } from './create-ade_attributes.dto';
export class UpdateAdeAttributesDto extends PartialType(
  CreateAdeAttributesDto,
) {}
