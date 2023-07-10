/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeApisController } from './ade_apis.controller';
import { AdeApisService } from './ade_apis.service';
import { AdeApis } from './ade_apis.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeApis, AdeRoleTable, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeApisService],
  controllers: [AdeApisController],
})
export class AdeApisModule {}
