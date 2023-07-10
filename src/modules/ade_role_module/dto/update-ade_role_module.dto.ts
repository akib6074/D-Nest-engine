/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeRoleModuleDto } from './create-ade_role_module.dto';
export class UpdateAdeRoleModuleDto extends PartialType(
  CreateAdeRoleModuleDto,
) {}
