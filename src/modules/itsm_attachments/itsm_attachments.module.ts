/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmAttachmentsController } from './itsm_attachments.controller';
import { ItsmAttachmentsService } from './itsm_attachments.service';
import { ItsmAttachments } from './itsm_attachments.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmAttachments, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmAttachmentsService],
  controllers: [ItsmAttachmentsController],
})
export class ItsmAttachmentsModule {}
    