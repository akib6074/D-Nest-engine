/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeRoleTableDto } from './create-ade_role_table.dto';
export class UpdateAdeRoleTableDto extends PartialType(CreateAdeRoleTableDto) {}
