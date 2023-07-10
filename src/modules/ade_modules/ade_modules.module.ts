/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeModulesController } from './ade_modules.controller';
import { AdeModulesService } from './ade_modules.service';
import { AdeModules } from './ade_modules.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleModule } from '../ade_role_module/ade_role_module.model';
import { AdeRoles } from '../ade_roles/ade_roles.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AdeModules,
      AdeRoleTable,
      AdeTables,
      AdeRoleModule,
      AdeRoles,
    ]),
    HelpersModule,
  ],
  providers: [AdeModulesService],
  controllers: [AdeModulesController],
})
export class AdeModulesModule {}
