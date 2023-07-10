/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateAdeUsersDto } from './create-ade_users.dto';
export class UpdateAdeUsersDto extends PartialType(CreateAdeUsersDto) {}
