/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeTablesController } from './ade_tables.controller';
import { AdeTablesService } from './ade_tables.service';
import { AdeTables } from './ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([AdeTables]), HelpersModule],
  providers: [AdeTablesService],
  controllers: [AdeTablesController],
})
export class AdeTablesModule {}
