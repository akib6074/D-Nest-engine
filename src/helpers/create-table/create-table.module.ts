/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateTableService } from './create-table.service';
import { CreateTableController } from './create-table.controller';
import { HelpersModule } from '../helpers/helpers.module';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
import { AdeAttributes } from 'src/modules/ade_attributes/ade_attributes.model';
import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeTables, AdeAttributes, AdeRoleTable]),
    HelpersModule,
  ],
  providers: [CreateTableService],
  controllers: [CreateTableController],
})
export class CreateTableModule {}
