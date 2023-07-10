/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmIssuesController } from './itsm_issues.controller';
import { ItsmIssuesService } from './itsm_issues.service';
import { ItsmIssues } from './itsm_issues.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { ItsmAttachments } from '../itsm_attachments/itsm_attachments.model';
import { CustomeUIDService } from '../common-services/customUID.service';
import { ItsmUniqueId } from '../itsm_unique_id/itsm_unique_id.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmIssues, AdeRoleTable, AdeTables,ItsmAttachments,ItsmUniqueId]), HelpersModule],
  providers: [ItsmIssuesService,CustomeUIDService],
  controllers: [ItsmIssuesController],
})
export class ItsmIssuesModule {}
    