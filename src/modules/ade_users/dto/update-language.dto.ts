/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateLanguage {
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  language_name: string;
}
