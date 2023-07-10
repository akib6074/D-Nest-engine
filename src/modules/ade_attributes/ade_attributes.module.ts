/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeAttributesController } from './ade_attributes.controller';
import { AdeAttributesService } from './ade_attributes.service';
import { AdeAttributes } from './ade_attributes.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AdeAttributes, AdeTables]),
    HelpersModule,
  ],
  providers: [AdeAttributesService],
  controllers: [AdeAttributesController],
})
export class AdeAttributesModule {}
