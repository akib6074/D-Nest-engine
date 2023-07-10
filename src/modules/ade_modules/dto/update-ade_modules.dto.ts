/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeModulesDto } from './create-ade_modules.dto';
export class UpdateAdeModulesDto extends PartialType(CreateAdeModulesDto) {}
