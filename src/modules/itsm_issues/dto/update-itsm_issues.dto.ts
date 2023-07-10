/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateItsmIssuesDto } from './create-itsm_issues.dto';
export class UpdateItsmIssuesDto extends PartialType(CreateItsmIssuesDto) {}
    