/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeMastersDto } from './create-ade_masters.dto';
export class UpdateAdeMastersDto extends PartialType(CreateAdeMastersDto) {}
