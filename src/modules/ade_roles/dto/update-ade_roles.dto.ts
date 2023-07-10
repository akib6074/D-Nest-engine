/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeRolesDto } from './create-ade_roles.dto';
export class UpdateAdeRolesDto extends PartialType(CreateAdeRolesDto) {}
