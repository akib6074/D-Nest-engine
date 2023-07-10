/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeMenuPriviledgeDto } from './create-ade_menu_priviledge.dto';
export class UpdateAdeMenuPriviledgeDto extends PartialType(
  CreateAdeMenuPriviledgeDto,
) {}
