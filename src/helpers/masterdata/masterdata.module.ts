/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { HelpersModule } from '../helpers/helpers.module';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
import { AdeAttributes } from 'src/modules/ade_attributes/ade_attributes.model';
import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';
import { MasterDataController } from './masterdata.controller';
import { MasterDataService } from './masterdata.service';
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AdeTables,
      AdeAttributes,
      AdeRoleTable,
      AdeMenus,
    ]),
    HelpersModule,
  ],
  providers: [MasterDataService],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
