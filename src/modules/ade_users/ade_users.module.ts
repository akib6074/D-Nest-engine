/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { AdeUsersController } from './ade_users.controller';
import { AdeUsersService } from './ade_users.service';
import { AdeUsers } from './ade_users.model';
import { AdeRoles } from '../ade_roles/ade_roles.model';

@Module({
  imports: [SequelizeModule.forFeature([AdeUsers]), HelpersModule],
  providers: [AdeUsersService],
  controllers: [AdeUsersController],
  exports: [SequelizeModule, AdeUsersService],
})
export class AdeUsersModule {}
