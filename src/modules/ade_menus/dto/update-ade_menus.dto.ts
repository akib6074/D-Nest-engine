/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeMenusDto } from './create-ade_menus.dto';
export class UpdateAdeMenusDto extends PartialType(CreateAdeMenusDto) {}
