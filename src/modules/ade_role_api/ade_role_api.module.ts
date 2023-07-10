/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeRoleApiController } from './ade_role_api.controller';
import { AdeRoleApiService } from './ade_role_api.service';
import { AdeRoleApi } from './ade_role_api.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeRoleApi, AdeRoleTable, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeRoleApiService],
  controllers: [AdeRoleApiController],
})
export class AdeRoleApiModule {}
