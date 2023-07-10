/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeMenuPriviledgeController } from './ade_menu_priviledge.controller';
import { AdeMenuPriviledgeService } from './ade_menu_priviledge.service';
import { AdeMenuPriviledge } from './ade_menu_priviledge.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeMenus } from '../ade_menus/ade_menus.model';
import { AdeApis } from '../ade_apis/ade_apis.model';
import { AdeRoleApi } from '../ade_role_api/ade_role_api.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AdeMenuPriviledge,
      AdeRoleTable,
      AdeTables,
      AdeMenus,
      AdeApis,
      AdeRoleApi,
    ]),
    HelpersModule,
  ],
  providers: [AdeMenuPriviledgeService],
  controllers: [AdeMenuPriviledgeController],
})
export class AdeMenuPriviledgeModule {}
