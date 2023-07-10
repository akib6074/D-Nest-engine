/* eslint-disable prettier/prettier */
import {
  Controller,
  Param,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
  ForbiddenException,
  Inject,
  Patch,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import sequelize from 'sequelize';
//import { databaseProviders } from 'src/database.provider';
import { JwtAuthGuard } from 'src/modules/ade-auth/jwt-auth.guard';
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
import { HelpersService } from '../helpers/helpers.service';
import { MDCreateTableDto } from './dto/md-create-table.dto';
import { MasterDataService } from './masterdata.service';
import { MDAlterTableDto } from './dto/md-alter-table.dto';

@Controller('masterdata')
export class MasterDataController {
  constructor(
    //@Inject(databaseProviders) private dbService,
    private masterDataService: MasterDataService,
    private helpers: HelpersService,
    @InjectModel(AdeTables) private adeTables: typeof AdeTables,
    @InjectModel(AdeMenus) private ade_menus: typeof AdeMenus,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTable(@Body() table: MDCreateTableDto, @Request() req) {
    const { name, email, sub, role } = req.user;
    if (role !== 1) {
      throw new ForbiddenException();
    }
    // await this.masterDataService.createTable(table, req.user);
    // console.log(req.user);
    const association = await this.masterDataService.createModel(
      table,
      req.user,
    );
    if (table.createCrud) {
      if (table.fieldList.filter((e) => e.type === 'file').length > 0) {
        await this.masterDataService.createUserModule(
          table,
          association as string[],
          true,
        );
      } else {
        await this.masterDataService.createUserModule(
          table,
          association as string[],
          false,
        );
      }
      return 'table with crud services created successfully!';
    }

    return 'table created successfully!';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTables(@Request() req) {
    const { tableName } = req.query;
    if (tableName) {
      return (
        {
          tableAttributes: await this.adeTables.sequelize
            .getQueryInterface()
            .describeTable(tableName),
        } || {}
      );
    } else {
      const result = await this.adeTables.sequelize
        .getQueryInterface()
        .showAllTables();
      return (
        {
          tables: result.map((t) => t['tableName']),
        } || {}
      );
    }

    // console.log(response);
    // const onlyTabeNames = response.map((m) => m['tableName']);
    // console.log(onlyTabeNames);
    // return { tables: response } || {};
    //return response } || {};
  }

  @Get(':id')
  async getMasterData(@Param('id') id: string, @Request() req) {
    const table = await this.adeTables.findOne({
      where: {
        id: +id,
        is_active: true,
      },
    });
    if (table.table_name === 'ade_menus') {
      return await this[`${table.table_name}`].findAll();
    }
    const response = await this.adeTables.sequelize
      .getQueryInterface()
      .showAllTables();
    const onlyTabeNames = response.map((m) => m['tableName']);
    //return { tables: onlyTabeNames } || {};
    return { tables: response } || {};
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':tableName')
  async update(
    @Param('tableName') tableName: string,
    @Body() alterTableDto: MDAlterTableDto,
    @Request() req,
  ) {
    return await this.masterDataService.alterTable(
      tableName,
      alterTableDto,
      req.user,
    );
  }

  async addModelToSelf(table: MDCreateTableDto) {
    const modelToAdd = await this.helpers.capitalizeFirstLetter(
      table.tableName,
    );
    const fileName = 'src/helpers/masterdata/masterdata.controller.ts';
    const modelPath = `src/modules/${this.helpers.toSnakeCase(
      table.tableName,
    )}/${this.helpers.toSnakeCase(table.tableName)}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
    const fileAllReadyImported = this.helpers.checkFileForAString(
      fileName,
      importString,
    );
    if (!fileAllReadyImported) {
      await this.helpers.insertAtLine(fileName, 1, importString);
    }
    //this.dbService.model(modelToAdd).sync({ alter: true });
    //this.dbService.
  }
}
