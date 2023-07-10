/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmUniqueIdController } from './itsm_unique_id.controller';
import { ItsmUniqueIdService } from './itsm_unique_id.service';
import { ItsmUniqueId } from './itsm_unique_id.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmUniqueId, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmUniqueIdService],
  controllers: [ItsmUniqueIdController],
})
export class ItsmUniqueIdModule {}
    