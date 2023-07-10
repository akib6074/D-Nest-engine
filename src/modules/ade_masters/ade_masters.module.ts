/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeMastersController } from './ade_masters.controller';
import { AdeMastersService } from './ade_masters.service';
import { AdeMasters } from './ade_masters.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeApis } from '../ade_apis/ade_apis.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeMasters, AdeRoleTable, AdeTables, AdeApis]),
    HelpersModule,
  ],
  providers: [AdeMastersService],
  controllers: [AdeMastersController],
})
export class AdeMastersModule {}
