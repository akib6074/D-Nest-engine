/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeMenusController } from './ade_menus.controller';
import { AdeMenusService } from './ade_menus.service';
import { AdeMenus } from './ade_menus.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeApis } from '../ade_apis/ade_apis.model';
import { AdeRoleApi } from '../ade_role_api/ade_role_api.model';
@Module({
  imports: [
    SequelizeModule.forFeature([
      AdeMenus,
      AdeRoleTable,
      AdeTables,
      AdeApis,
      AdeRoleApi,
    ]),
    HelpersModule,
  ],
  providers: [AdeMenusService],
  controllers: [AdeMenusController],
})
export class AdeMenusModule {}
