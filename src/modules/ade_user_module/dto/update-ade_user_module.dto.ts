/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeUserModuleDto } from './create-ade_user_module.dto';
export class UpdateAdeUserModuleDto extends PartialType(
  CreateAdeUserModuleDto,
) {}
