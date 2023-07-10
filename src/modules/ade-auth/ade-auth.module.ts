/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./ade-auth.service";
import { AuthController } from "./ade-auth.controller";
import { AdeUsersModule } from "src/modules/ade_users/ade_users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AdeRoleModuleService } from "../ade_role_module/ade_role_module.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdeRoleModule } from "../ade_role_module/ade_role_module.model";
import { AdeRoles } from "../ade_roles/ade_roles.model";
import { AdeRoleTable } from "../ade_role_table/ade_role_table.model";
import { AdeTables } from "../ade_tables/ade_tables.model";
import { HelpersService } from "src/helpers/helpers/helpers.service";
//import {ConfigService} from '@nestjs/config';
@Module({
  imports: [
    AdeUsersModule,
    PassportModule,
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: "24h" },
    }),
    SequelizeModule.forFeature([
      AdeRoleModule,
      AdeRoleTable,
      AdeTables
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdeRoleModuleService, HelpersService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
