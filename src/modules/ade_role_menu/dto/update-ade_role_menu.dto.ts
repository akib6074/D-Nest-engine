/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeRoleMenuDto } from './create-ade_role_menu.dto';
export class UpdateAdeRoleMenuDto extends PartialType(CreateAdeRoleMenuDto) {}
