/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeUserModuleController } from './ade_user_module.controller';
import { AdeUserModuleService } from './ade_user_module.service';
import { AdeUserModule } from './ade_user_module.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeUserModule, AdeRoleTable, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeUserModuleService],
  controllers: [AdeUserModuleController],
})
export class AdeUserModuleModule {}
