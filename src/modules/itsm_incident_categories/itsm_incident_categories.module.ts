/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmIncidentCategoriesController } from './itsm_incident_categories.controller';
import { ItsmIncidentCategoriesService } from './itsm_incident_categories.service';
import { ItsmIncidentCategories } from './itsm_incident_categories.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmIncidentCategories, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmIncidentCategoriesService],
  controllers: [ItsmIncidentCategoriesController],
})
export class ItsmIncidentCategoriesModule {}
    