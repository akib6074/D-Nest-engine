/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmAttachmentsDto } from './create-itsm_attachments.dto';
export class UpdateItsmAttachmentsDto extends PartialType(CreateItsmAttachmentsDto) {}
    