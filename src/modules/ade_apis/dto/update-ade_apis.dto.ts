/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeApisDto } from './create-ade_apis.dto';
export class UpdateAdeApisDto extends PartialType(CreateAdeApisDto) {}
