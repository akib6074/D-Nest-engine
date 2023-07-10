/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ItsmServiceCategoriesController } from './itsm_service_categories.controller';
import { ItsmServiceCategoriesService } from './itsm_service_categories.service';
import { ItsmServiceCategories } from './itsm_service_categories.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([ItsmServiceCategories, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [ItsmServiceCategoriesService],
  controllers: [ItsmServiceCategoriesController],
})
export class ItsmServiceCategoriesModule {}
    