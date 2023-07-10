/* eslint-disable prettier/prettier */
import { ItsmIncidentSubCategoriesModule } from 'src/modules/itsm_incident_sub_categories/itsm_incident_sub_categories.module';

import {ItsmIncidentSubCategories} from 'src/modules/itsm_incident_sub_categories/itsm_incident_sub_categories.model';

import { ItsmIncidentCategoriesModule } from 'src/modules/itsm_incident_categories/itsm_incident_categories.module';

import {ItsmIncidentCategories} from 'src/modules/itsm_incident_categories/itsm_incident_categories.model';

import { ItsmAllReqStatusModule } from 'src/modules/itsm_all_req_status/itsm_all_req_status.module';

import {ItsmAllReqStatus} from 'src/modules/itsm_all_req_status/itsm_all_req_status.model';

import { ItsmUniqueIdModule } from 'src/modules/itsm_unique_id/itsm_unique_id.module';

import {ItsmUniqueId} from 'src/modules/itsm_unique_id/itsm_unique_id.model';

import { ItsmIssuesModule } from 'src/modules/itsm_issues/itsm_issues.module';

import {ItsmIssues} from 'src/modules/itsm_issues/itsm_issues.model';

import { ItsmAttachmentsModule } from 'src/modules/itsm_attachments/itsm_attachments.module';

import {ItsmAttachments} from 'src/modules/itsm_attachments/itsm_attachments.model';

import { ItsmServiceCategoriesModule } from 'src/modules/itsm_service_categories/itsm_service_categories.module';

import {ItsmServiceCategories} from 'src/modules/itsm_service_categories/itsm_service_categories.model';


import { AdeMastersModule } from 'src/modules/ade_masters/ade_masters.module';

import { AdeMasters } from 'src/modules/ade_masters/ade_masters.model';

import { AdeUserModuleModule } from 'src/modules/ade_user_module/ade_user_module.module';

import { AdeUserModule } from 'src/modules/ade_user_module/ade_user_module.model';

import { AdeRoleMenuModule } from 'src/modules/ade_role_menu/ade_role_menu.module';

import { AdeRoleMenu } from 'src/modules/ade_role_menu/ade_role_menu.model';

import { AdeMenusModule } from 'src/modules/ade_menus/ade_menus.module';

import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';

import { AdeModulesModule } from 'src/modules/ade_modules/ade_modules.module';

import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';

import { AdeRoleTableModule } from 'src/modules/ade_role_table/ade_role_table.module';

import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';

import { AdeUsersModule } from 'src/modules/ade_users/ade_users.module';

import { AdeUsers } from 'src/modules/ade_users/ade_users.model';

import { AdeRolesModule } from 'src/modules/ade_roles/ade_roles.module';

import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';

import { AdeAttributesModule } from 'src/modules/ade_attributes/ade_attributes.module';

import { AdeAttributes } from 'src/modules/ade_attributes/ade_attributes.model';

import { AdeTablesModule } from 'src/modules/ade_tables/ade_tables.module';

import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
import { AuthModule } from './modules/ade-auth/ade-auth.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { CreateTableModule } from './helpers/create-table/create-table.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomeExceptionsFilter } from './custome-exceptions.filter';

import { MasterDataModule } from './helpers/masterdata/masterdata.module';
import { AdeApis } from './modules/ade_apis/ade_apis.model';
import { AdeMenuPriviledge } from './modules/ade_menu_priviledge/ade_menu_priviledge.model';
import { AdeRoleApi } from './modules/ade_role_api/ade_role_api.model';
import { AdeRoleModule } from './modules/ade_role_module/ade_role_module.model';
import { AdeApisModule } from './modules/ade_apis/ade_apis.module';
import { AdeMenuPriviledgeModule } from './modules/ade_menu_priviledge/ade_menu_priviledge.module';
import { AdeRoleApiModule } from './modules/ade_role_api/ade_role_api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      synchronize: true,
      autoLoadModels: true,
      sync: { alter: false },
      logging: true,
      dialect:
        process.env.DB_DIALECT == 'mysql'
          ? `mysql`
          : process.env.DB_DIALECT == 'postgres'
          ? `postgres`
          : process.env.DB_DIALECT == 'oracle'
          ? `oracle`
          : 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_DEVELOPMENT,
      models: [ItsmIncidentSubCategories,ItsmIncidentCategories,ItsmAllReqStatus,ItsmUniqueId,ItsmIssues,ItsmAttachments,ItsmServiceCategories,
        AdeRoleApi,
        AdeApis,
        AdeRoleModule,
        AdeMenuPriviledge,
        AdeMasters,
        AdeUserModule,
        AdeRoleMenu,
        AdeMenus,
        AdeModules,
        AdeRoleTable,
        AdeUsers,
        AdeRoles,
        AdeAttributes,
        AdeTables,
      ],
    }),
    AuthModule,
    CreateTableModule,ItsmIncidentSubCategoriesModule,ItsmIncidentCategoriesModule,ItsmAllReqStatusModule,ItsmUniqueIdModule,ItsmIssuesModule,ItsmAttachmentsModule,ItsmServiceCategoriesModule,
    AdeMastersModule,
    MasterDataModule,
    AdeUserModuleModule,
    AdeRoleMenuModule,
    AdeMenusModule,
    AdeModulesModule,
    AdeRoleTableModule,
    AdeUsersModule,
    AdeRolesModule,
    AdeAttributesModule,
    AdeTablesModule,
    AdeApisModule,
    AdeMenuPriviledgeModule,
    AdeRoleApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomeExceptionsFilter },
  ],
})
export class AppModule {}
