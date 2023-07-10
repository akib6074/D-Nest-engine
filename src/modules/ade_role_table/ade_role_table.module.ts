/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeRoleTableController } from './ade_role_table.controller';
import { AdeRoleTableService } from './ade_role_table.service';
import { AdeRoleTable } from './ade_role_table.model';

@Module({
  imports: [SequelizeModule.forFeature([AdeRoleTable]), HelpersModule],
  providers: [AdeRoleTableService],
  controllers: [AdeRoleTableController],
})
export class AdeRoleTableModule {}
