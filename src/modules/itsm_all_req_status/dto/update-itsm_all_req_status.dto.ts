/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmAllReqStatusDto } from './create-itsm_all_req_status.dto';
export class UpdateItsmAllReqStatusDto extends PartialType(CreateItsmAllReqStatusDto) {}
    