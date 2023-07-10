/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeRoleModuleController } from './ade_role_module.controller';
import { AdeRoleModuleService } from './ade_role_module.service';
import { AdeRoleModule } from './ade_role_module.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeRoleModule, AdeRoleTable, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeRoleModuleService],
  controllers: [AdeRoleModuleController],
})
export class AdeRoleModuleModule {}
