/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmAllReqStatusController } from './itsm_all_req_status.controller';
import { ItsmAllReqStatusService } from './itsm_all_req_status.service';
import { ItsmAllReqStatus } from './itsm_all_req_status.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmAllReqStatus, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmAllReqStatusService],
  controllers: [ItsmAllReqStatusController],
})
export class ItsmAllReqStatusModule {}
    