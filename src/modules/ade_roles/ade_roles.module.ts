/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeRolesController } from './ade_roles.controller';
import { AdeRolesService } from './ade_roles.service';
import { AdeRoles } from './ade_roles.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleModule } from '../ade_role_module/ade_role_module.model';
import { AdeModules } from '../ade_modules/ade_modules.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AdeRoles,
      AdeRoleTable,
      AdeTables,
      AdeRoleModule,
      AdeModules,
    ]),
    HelpersModule,
  ],
  providers: [AdeRolesService],
  controllers: [AdeRolesController],
})
export class AdeRolesModule {}
