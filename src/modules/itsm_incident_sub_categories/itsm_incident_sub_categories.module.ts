/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmIncidentSubCategoriesController } from './itsm_incident_sub_categories.controller';
import { ItsmIncidentSubCategoriesService } from './itsm_incident_sub_categories.service';
import { ItsmIncidentSubCategories } from './itsm_incident_sub_categories.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmIncidentSubCategories, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmIncidentSubCategoriesService],
  controllers: [ItsmIncidentSubCategoriesController],
})
export class ItsmIncidentSubCategoriesModule {}
    