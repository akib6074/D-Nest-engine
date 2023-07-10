/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeRoleApiDto } from './create-ade_role_api.dto';
export class UpdateAdeRoleApiDto extends PartialType(CreateAdeRoleApiDto) {}
