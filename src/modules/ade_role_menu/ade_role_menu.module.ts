/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeRoleMenuController } from './ade_role_menu.controller';
import { AdeRoleMenuService } from './ade_role_menu.service';
import { AdeRoleMenu } from './ade_role_menu.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeRoleMenu, AdeRoleTable, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeRoleMenuService],
  controllers: [AdeRoleMenuController],
})
export class AdeRoleMenuModule {}
