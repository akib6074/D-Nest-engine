/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdeAttributes } from 'src/modules/ade_attributes/ade_attributes.model';
import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
import { HelpersService } from '../helpers/helpers.service';
import { MDCreateTableDto } from './dto/md-create-table.dto';
import { promisify } from 'util';
//import { exec } from 'child_process';
import * as fs from 'fs';
import {
  D_BOOL,
  D_DATE,
  D_INT,
  D_STRING,
  D_TEXT,
  D_TIME,
  D_UUID,
  S_BOOL,
  S_DATE,
  S_ENUM,
  S_INT,
  S_STRING,
  S_UUID,
  T_BOOL,
  T_DATE,
  T_FILE,
  T_NUMBER,
  T_STRING,
  T_TEXT,
  T_TIME,
  T_UUID,
} from '../constants/constants';
import { MDAlterTableDto } from './dto/md-alter-table.dto';
import sequelize, { Sequelize } from 'sequelize';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectModel(AdeTables) private adeTables: typeof AdeTables,
    @InjectModel(AdeAttributes) private adeAttributes: typeof AdeAttributes,
    @InjectModel(AdeRoleTable) private adeRoleTable: typeof AdeRoleTable,
    private helpers: HelpersService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async alterTable(
    tableName: string,
    alterTableDto: MDAlterTableDto,
    payload: any,
  ) {
    // const myFields = {
    //   id: {
    //     primaryKey: true,
    //     type: sequelize.INTEGER,
    //     field: 'id',
    //   },
    //   name: {
    //     type: sequelize.STRING,
    //     field: 'name',
    //   },
    //   test: {
    //     type: sequelize.STRING,
    //     field: 'test',
    //   },
    //   test2: {
    //     type: sequelize.STRING,
    //     field: 'test2',
    //   },
    //   test3: {
    //     type: sequelize.STRING,
    //     field: 'test3',
    //   },
    //   is_active: {
    //     type: sequelize.INTEGER,
    //     field: 'is_active',
    //   },
    //   createdBy: {
    //     type: sequelize.INTEGER,
    //     field: 'created_by',
    //   },
    //   updatedBy: {
    //     type: sequelize.INTEGER,
    //     field: 'updated_by',
    //   },
    //   createdAt: {
    //     type: sequelize.DATE,
    //     field: 'created_at',
    //   },
    //   updatedAt: {
    //     type: sequelize.DATE,
    //     field: 'updated_at',
    //   },
    //   deletedAt: {
    //     type: sequelize.DATE,
    //     field: 'deleted_at',
    //   },
    // };
    // const newModel = this.registerModel('example2', 'Example', myFields);
    // const items = await newModel.findAll({});
    // await this.adeTables.sequelize
    //   .getQueryInterface()
    //   .addColumn(tableName, 'hello4', {
    //     type: await this.returnSequelizeDataType(
    //       alterTableDto.columnsToAdd[0].type,
    //     ),
    //     allowNull: alterTableDto.columnsToAdd[1].allowNull,
    //     defaultValue: alterTableDto.columnsToAdd[1].defaultValue,
    //     primaryKey: alterTableDto.columnsToAdd[1].primaryKey,
    //     autoIncrement: alterTableDto.columnsToAdd[1].autoIncrement,
    //     comment: alterTableDto.columnsToAdd[1].comment,
    //   });

    if (alterTableDto.addColumns) {
      for (let i = 0; i < alterTableDto.columnsToAdd.length; i++) {
        await this.adeTables.sequelize
          .getQueryInterface()
          .addColumn(tableName, alterTableDto.columnsToAdd[i].columnName, {
            type: await this.returnSequelizeDataType(
              alterTableDto.columnsToAdd[i].type,
            ),
            allowNull: alterTableDto.columnsToAdd[i].allowNull,
            defaultValue: alterTableDto.columnsToAdd[i].defaultValue,
            primaryKey: alterTableDto.columnsToAdd[i].primaryKey,
            autoIncrement: alterTableDto.columnsToAdd[i].autoIncrement,
            comment: alterTableDto.columnsToAdd[i].comment,
          });
      }
    }
    if (alterTableDto.removeColumns) {
      for (let i = 0; i < alterTableDto.columnsToRemove.length; i++) {
        await this.adeTables.sequelize
          .getQueryInterface()
          .removeColumn(tableName, alterTableDto.columnsToRemove[i].columnName);
      }
    }
    if (alterTableDto.renameColumns) {
      for (let i = 0; i < alterTableDto.columnsToRename.length; i++) {
        await this.adeTables.sequelize
          .getQueryInterface()
          .renameColumn(
            tableName,
            alterTableDto.columnsToRename[i].columnName,
            alterTableDto.columnsToRename[i].newColumnName,
          );
      }
    }
    if (alterTableDto.changeColumns) {
      for (let i = 0; i < alterTableDto.columnsToChange.length; i++) {
        await this.adeTables.sequelize
          .getQueryInterface()
          .changeColumn(
            tableName,
            alterTableDto.columnsToChange[i].columnName,
            {
              type: await this.returnSequelizeDataType(
                alterTableDto.columnsToChange[i].type,
              ),
              allowNull: alterTableDto.columnsToChange[i].allowNull,
              defaultValue: alterTableDto.columnsToChange[i].defaultValue,
              primaryKey: alterTableDto.columnsToChange[i].primaryKey,
              autoIncrement: alterTableDto.columnsToChange[i].autoIncrement,
              comment: alterTableDto.columnsToChange[i].comment,
            },
          );
      }
    }

    const response = await this.adeTables.sequelize
      .getQueryInterface()
      .describeTable(tableName);
    return response;
  }

  registerModel(tableName: string, modelName: string, fields: any) {
    const baseModel = this.adeTables.sequelize.define(
      modelName,
      { ...fields },
      { tableName: tableName, timestamps: false },
    );
    return baseModel;
  }
  async createModel(createTableDto: MDCreateTableDto, payload: any) {
    const belongsTo = [];
    const has = [];
    let data = `/* eslint-disable prettier/prettier */\n`;
    data += `import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany, HasOne, BelongsToMany } from 'sequelize-typescript';\n`;
    let primaryKeyString = `\t@Column({primaryKey: true, autoIncrement: true,type: ${D_INT}})
\t@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
\tid?: number;\n`;
    let generalColumnString = '';
    let importModelString = '';
    let foriegnTableImportModelString = '';
    let foreignTableForeignKeyString = '';

    let foreignKeyString = '';
    let belongsToString = '';
    // these columns will be added to the foreign table
    let HasManyString = '';
    let HasOneString = '';
    let belongsToManyString = '';
    type updateFileData = {
      modelName: string;
      modelFile: string;
      importString: string;
      hasString: string;
    };
    let enumDefinitionString = '';
    let enumColumnString = '';
    const updateForeignModelStructure: updateFileData[] = [];
    const { tableName, fieldList } = createTableDto;
    const modulePath = `src/modules/${tableName}`;
    if (!this.helpers.checkIfFileOrDirectoryExists(modulePath)) {
      fs.mkdirSync(modulePath);
    }
    const modelName = await this.helpers.capitalizeFirstLetter(tableName);
    // check if any key is a primary key.
    for (let i = 0; i < fieldList.length; i++) {
      const fieldType = await this.returnColumnFieldType(fieldList[i].type);
      const fieldName = fieldList[i].field;
      //       if (fieldList[i].primaryKey) {
      //         //const primaryKey = fieldList[i].field;
      //         const primaryKey = 'id';
      //         primaryKeyString += `\t@Column({primaryKey: true, autoIncrement: true,type: ${D_INT}})
      // \t@Index({name: "PRIMARY", using: "BTREE", order: "ASC", unique: true})
      // \t${primaryKey}?: number;\n`;
      //         continue;
      //       }
      // primary key is done. now lets add the foreign key columns
      //check if any field is foreign key
      // if it is, then import the reference model from the reference table
      if (fieldList[i].foreignKey) {
        // now the reference has all the relationship info
        const foreignTable = fieldList[i].reference.right_table;
        const foreignModel = await this.helpers.capitalizeFirstLetter(
          foreignTable,
        );
        const foreignKey = fieldList[i].reference.right_table_key;
        const thisTable = fieldList[i].reference.left_table;
        const thisModel = await this.helpers.capitalizeFirstLetter(thisTable);
        const thisTableKey = fieldList[i].reference.left_table_key;

        // so there is a module in the src path under same name
        // and there is a model under same name in the model folder inside module folder
        importModelString += `import { ${foreignModel} } from 'src/modules/${foreignTable}/${foreignTable}.model';\n`;
        // import adding is done
        // now check the relationship style.
        // firstcheck if it's one to many
        if (fieldList[i].reference.relation.toLowerCase() === '1:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignModel})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t${thisTableKey}?: ${fieldList[i].type};\n`;
          belongsToString += `
\t@BelongsTo(() => ${foreignModel},{ as: '${foreignModel.toLowerCase()}', foreignKey: '${thisTableKey}' })
\t${foreignModel}?: ${foreignModel};\n`;
          belongsTo.push(foreignModel); // for inclusion in sequelize crud service
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file

          foriegnTableImportModelString = `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          // now define the column that will indicate the association
          //           HasManyString = `
          // \t@HasMany(() => ${thisModel})
          // \t${thisTable}?: ${thisModel}[];\n`;
          has.push(thisModel); // for inclusion in crud service
          const foreignModelFilePath = `src/modules/${foreignTable}/${foreignTable}.model.ts`;
          // lets push the foreign model update data for later file writing

          updateForeignModelStructure.push({
            modelName: foreignModel,
            modelFile: foreignModelFilePath,
            importString: foriegnTableImportModelString,
            hasString: HasManyString,
          });
        } // 1:N relatioship is done
        if (fieldList[i].reference.relation.toLowerCase() === '1:1') {
          // in this case foreignKey atttribute should be added before the primaryKey column
          const tempStr = primaryKeyString;
          primaryKeyString = `@ForeignKey(() => ${foreignModel})\n`;
          primaryKeyString += tempStr;
          // now define the belongs to assosiation
          belongsToString += `
          @BelongsTo(() => ${foreignModel})
          ${foreignModel}?: ${foreignModel};\n`;
          belongsTo.push(foreignModel);
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString += `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          // add the primary key of this model to foreign model
          foreignTableForeignKeyString = `
          @Column({            
            type: DataType.INTEGER 
          })
          @Index({
            name: "${foreignTable}_${thisTable}_${thisTableKey}_fk",
            using: "BTREE",
            order: "ASC",
            unique: false 
          })
          ${thisTableKey}!: number;\n`;
          // defing hasone association
          HasOneString += `
          @HasOne(() => ${thisModel})
          ${thisTable}?: ${thisModel};\n`;
          has.push(thisModel);

          const foreignModelFilePath = `src/modules/${foreignTable}/${foreignTable}.model.ts`;
          // lets push the foreign model update data for later file writing

          updateForeignModelStructure.push({
            modelName: foreignModel,
            modelFile: foreignModelFilePath,
            importString: foriegnTableImportModelString,
            hasString: foreignTableForeignKeyString + HasOneString,
          });
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          if (
            !this.helpers.checkFileForAString(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              `${thisTable}.model`,
            )
          ) {
            await this.helpers.insertAtLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              1,
              foriegnTableImportModelString,
            );
            const foreignModelFileTotalLine = await this.helpers.getTotalLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            );
            await this.helpers.insertAtLine(
              `src/modules/${foreignTable}/${foreignTable}.model.ts`,
              foreignModelFileTotalLine - 2,
              HasOneString,
            );
          }
          //done
        }
        if (fieldList[i].reference.relation.toLowerCase() === 'm:n') {
          // console.log('202', fieldList[i].reference);
          foreignKeyString += `
\t@ForeignKey(() => ${foreignModel})
\t@Column({                                  
\ttype: ${fieldType}
\t})
\t@Index({
\nname: "PRIMARY",
\tusing: "BTREE",
\torder: "ASC",
\tunique: true 
\t})
\t${foreignKey}?: ${fieldList[i].type};\n`;
          const joinTable = fieldList[i].reference.join_table;
          const joinModel = await this.helpers.capitalizeFirstLetter(joinTable);
          // we now have to modify the foreign table also to reflect the association with this table
          // first import this table to foreign model file
          foriegnTableImportModelString = `import { ${thisModel} } from 'src/modules/${thisTable}/${thisTable}.model';\n`;
          foriegnTableImportModelString += `import { ${joinModel} } from 'src/modules/${joinTable}/${joinTable}.model';\n`;
          // now define the column that will indicate the association
          belongsToManyString = `
\t@BelongsToMany(() => ${joinModel}, () => ${thisModel})
\t${joinTable}?: ${joinModel}[];\n`;
          // we need to update the foreign table right now, because the
          // foreign key may point to a different table
          await this.helpers.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            1,
            foriegnTableImportModelString,
          );
          const foreignModelFileTotalLine = await this.helpers.getTotalLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
          );
          await this.helpers.insertAtLine(
            `src/modules/${foreignTable}/${foreignTable}.model.ts`,
            foreignModelFileTotalLine - 2,
            belongsToManyString,
          );
        } // 1:N relatioship is done
        // we will skip the many-to-many relationship for now

        continue;
      }
      if (fieldList[i].enum) {
        enumDefinitionString += `export const ${
          fieldList[i].enum.enumName
        }Types = [${fieldList[i].enum.enumValues.map(
          (val) => "'" + val + "'",
        )}];`;
        enumColumnString += `
  \t@Column(DataType.ENUM({ values: ${fieldList[i].enum.enumName}Types }))
  \t${fieldName}${fieldList[i].optional ? '?' : '!'}: string;\n`;
        continue;
      }
      // we will process the other fields for the moment
      // the fieldlist field is neither primary nor foreign key. therefore, it's a normal field
      const requiredTypeString = fieldList[i].optional
        ? 'allowNull: true'
        : 'allowNull: false';
      const uniqueColumnString = fieldList[i].unique
        ? 'unique: true'
        : 'unique: false';
      generalColumnString += `
        \t@Column({type: ${fieldType}, ${uniqueColumnString},${requiredTypeString}})
        \t${fieldName}: ${
        fieldList[i].type === 'file'
          ? 'string'
          : fieldList[i].type === 'textarea'
          ? 'string'
          : fieldList[i].type === 'time'
          ? 'typeof DataTypes.TIME'
          : fieldList[i].type
      };\n`;
    }
    const mandatoryColumnString = `
\t@Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
\tis_active: boolean;

\t@Column({type: ${D_INT}})
\tcreated_by?: number;

\t@Column({type: ${D_INT}})
\tupdated_by?: number;
`;
    // lets process model information for this table
    data += importModelString;
    data += enumDefinitionString;
    const tableDecorationString = `\n\t@Table({tableName: '${tableName}',timestamps: true,paranoid: true, createdAt: 'created_at', updatedAt: 'updated_at',deletedAt: 'deleted_at', comment: ""})\n`;

    data += tableDecorationString;
    const exportModelString = `\texport class ${modelName} extends Model {\n`;

    data += exportModelString;

    data += primaryKeyString;
    data += generalColumnString;
    data += enumColumnString;
    data += mandatoryColumnString;
    data += foreignKeyString;
    data += belongsToString;

    const modelCloserString = `
    }\n`;
    data += modelCloserString;

    // the data variable now has everything for the model file of this table
    // let's create a module folder under the same name, and write the model file inside it.
    // if (!this.helpers.checkIfFileOrDirectoryExists(tableName)) {
    //   fs.mkdirSync(tableName);
    // }
    const newModel = await this.helpers.createFile(
      `src/modules/${tableName}/`,
      `${tableName}.model.ts`,
      data,
    );
    const result = await this.helpers.getBelongsTo(
      `src/modules/${tableName}/${tableName}.model.ts`,
    );

    await this.addModelToApp(tableName);
    for (let i = 0; i < result.length; i++) {
      await this.addModelToApp(result[i]);
    }

    for (let j = 0; j < updateForeignModelStructure.length; j++) {
      // we need to update the foreign models also
      if (
        !this.helpers.checkFileForAString(
          updateForeignModelStructure[j].modelFile,
          `${tableName}.model`,
        )
      ) {
        await this.helpers.insertAtLine(
          updateForeignModelStructure[j].modelFile,
          1,
          updateForeignModelStructure[j].importString,
        );
        const foreignModelFileTotalLine = await this.helpers.getTotalLine(
          updateForeignModelStructure[j].modelFile,
        );
        await this.helpers.insertAtLine(
          updateForeignModelStructure[j].modelFile,
          foreignModelFileTotalLine - 2,
          updateForeignModelStructure[j].hasString,
        );
      }
    }
    await this.updateAdeTablesAndAttributes(createTableDto, payload);
    return result;
  }

  async updateAdeTablesAndAttributes(table: MDCreateTableDto, payload: any) {
    //console.log(payload);
    const response = await this.adeTables.create({
      table_name: table.tableName,
      created_by: payload.sub,
    });
    await this.adeAttributes.create({
      attribute_name: 'id',
      attribute_type: 'number',
      primaryKey: true,
      ade_table_id: response.id,
      created_by: payload.sub,
    });
    for (let i = 0; i < table.fieldList.length; i++) {
      let foreign_table_id = null;
      if (table.fieldList[i].foreignKey) {
        const result = await this.adeTables.findOne({
          where: { table_name: table.fieldList[i].reference.right_table },
        });
        if (result) {
          foreign_table_id = result.id;
        }
      }
      await this.adeAttributes.create({
        attribute_name: table.fieldList[i].field,
        attribute_type: table.fieldList[i].type,
        foreignKey: table.fieldList[i].foreignKey,
        foreign_table_id: foreign_table_id,
        ade_table_id: response.id,
        created_by: payload.sub,
      });
    }
    await this.adeRoleTable.create({
      role_id: payload.role,
      table_id: response.id,
      access_type: 'All',
      created_by: payload.sub,
    });
    return response;
  }

  async addModelToApp(tableName: string) {
    const modelToAdd = await this.helpers.capitalizeFirstLetter(tableName);
    const fileName = 'src/app.module.ts';
    const modelPath = `src/modules/${this.helpers.toSnakeCase(
      tableName,
    )}/${this.helpers.toSnakeCase(tableName)}.model`;
    //const modelPath = `src/modules/${tableName}/${tableName}.model`;
    const importString = `import {${modelToAdd}} from '${modelPath}';\n`;
    const splitter = 'models: [';

    const data = await this.helpers.splitFileTextByWord(fileName, splitter);
    if (data[0].includes(modelPath) === false)
      await this.helpers.insertAtLine(fileName, 1, importString);
    if (data[1].includes(modelToAdd)) return true;
    const data2 = await this.helpers.splitFileTextByWord(fileName, splitter);
    const temp = splitter + modelToAdd + ',';
    const finalData = data2[0] + temp + data2[1];
    const writeFile = promisify(fs.writeFile);
    await writeFile(fileName, finalData, 'utf8');
  }

  async createUserModule(
    table: MDCreateTableDto,
    association: string[],
    formData: boolean,
  ) {
    // first create a directory under module name inside the modules folder
    // then create a dto folder inside it
    // create two dto - called create-modelname-dto and update-modelname-dto inside it
    // create a model file inside the module directory
    // create a service have the crud services
    // create a controller having the crud controller
    // create the model
    // update the app.module
    const { tableName, fieldList } = table;
    const fileField = fieldList.filter((el) => el.type === 'file');
    const modelName = await this.helpers.capitalizeFirstLetter(tableName);
    const modulePath = `src/modules/${tableName}`;
    // if (!this.helpers.checkIfFileOrDirectoryExists(modulePath)) {
    //   fs.mkdirSync(modulePath);
    // }
    const dtoPath = modulePath + '/dto/';

    const dtoImportSring = `/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  MaxLength,
  MinLength,
} from 'class-validator'\n;
`;

    let createDtoData = `export class Create${modelName}Dto {\n`;

    let dtoFieldString = '';

    for (let i = 0; i < fieldList.length; i++) {
      const fieldName = fieldList[i].field;
      const fieldType =
        fieldList[i].type === 'file'
          ? 'string'
          : fieldList[i].type === 'textarea'
          ? 'string'
          : fieldList[i].type === 'time'
          ? 'typeof DataTypes.TIME'
          : fieldList[i].type;
      const defaultValueString = fieldList[i].default
        ? ' = ' + fieldList[i].default
        : '';
      const isOptionalString = fieldList[i].isRequired
        ? '@IsNotEmpty()\n'
        : '@IsOptional()\n';

      const isNumber = fieldType === 'number';
      const isString = fieldType === 'string';
      const isBoolean = fieldType === 'boolean';
      const isDecimal = fieldType === 'decimal';
      const isFile = fieldList[i].type === 'file';
      const isTime = fieldType === 'time';
      const isTextarea = fieldType === 'textarea';

      const dataTypeValidatorString = isString
        ? '@IsString()\n'
        : isNumber
        ? '@IsNumber()\n'
        : isBoolean
        ? '@IsBoolean()\n'
        : isFile
        ? ''
        : isTextarea
        ? ''
        : isTime
        ? 'typeof DataTypes.TIME'
        : '';
      const fieldString =
        dataTypeValidatorString +
        isOptionalString +
        fieldName +
        ':' +
        fieldType +
        defaultValueString +
        ';\n\n';

      dtoFieldString += fieldString;
    }
    createDtoData += dtoFieldString;

    const createDto = `create-${tableName}.dto.ts`;
    await this.createUserDto(
      createDto,
      dtoImportSring + createDtoData + '}',
      dtoPath,
    );

    // for now let's create and update dto same
    const updateDtoData = `/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { Create${modelName}Dto } from './create-${tableName}.dto';
export class Update${modelName}Dto extends PartialType(Create${modelName}Dto) {}
    `;
    const updateDto = `update-${tableName}.dto.ts`;
    await this.createUserDto(updateDto, updateDtoData, dtoPath);

    //now lets write the crud service file on the model
    let serviceFileData = `/* eslint-disable prettier/prettier */
import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { ${modelName} } from './${tableName}.model';
import { Create${modelName}Dto } from './dto/create-${tableName}.dto';
import { Update${modelName}Dto } from './dto/update-${tableName}.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import * as moment from "moment";
`;
    for (let i = 0; i < association.length; i++) {
      const impModelString = `import { ${association[i]} } from 'src/modules/${association[i]}/${association[i]}.model';\n`;
      serviceFileData += impModelString;
    }
    // const arrayOfIncludes = association.map(
    //   (m) => `{model:${m},attributes:attributesInclude? attributesInclude[
    //           modelIncludes.indexOf(this.helpers.toSnakeCase('${m}'))
    //         ]:[],}`,
    // );

    // const arrayOfIncludes2 = association.map(
    //   (m) => `{model:${m},attributes:[],}`,
    // );
    const arrayOfIncludes = association.map(
      (m) => `{model:${m},attributes:attributesInclude? attributesInclude[
              modelIncludes.indexOf('${m}')
            ]:[],}`,
    );
    const arrayOfIncludes2 = association.map(
      (m) => `{model:${m},attributes:[],}`,
    );

    serviceFileData +=
      `@Injectable()
      export class ${modelName}Service {
        constructor(
          @InjectModel(${modelName})
          private ${await this.helpers.uncapitalizeFirstLetter(
            tableName,
          )}: typeof ${modelName},
          @InjectModel(AdeRoleTable) 
          private role_table: typeof AdeRoleTable,
          @InjectModel(AdeTables) 
          private adeTables: typeof AdeTables,
          private helpers: HelpersService,
        ) {}
       async create(create${modelName}Dto: Create${modelName}Dto, payload: any,assets: any) {
        
          // const thisTableInfo = await this.adeTables.findOne({where: { table_name: '${tableName}',is_active:true, }});
          // if (!thisTableInfo) throw new ForbiddenException();
          // const canCreate = await this.role_table.findOne({
          //   where: {
          //     role_id: payload.role,
          //     table_id: thisTableInfo.id,
          //     access_type: 'All' || 'Create',
          //     is_active:true,
          //   },
          // });
          // if (!canCreate) throw new UnauthorizedException();
          if (assets.length > 0) {
            const file_name = assets[0].filename
            const photo = process.env.BASE_URL + 'images/users/' + file_name;                  
            await this.${await this.helpers.uncapitalizeFirstLetter(
              tableName,
            )}.create({
              ...create${modelName}Dto,
              ${
                fileField.length ? fileField[0]['field'] + ': photo,' : ''
              }       
              created_by: payload.sub,            
            });    
          }
          else{
            await this.${await this.helpers.uncapitalizeFirstLetter(
              tableName,
            )}.create({
              ...create${modelName}Dto,            
              created_by: payload.sub,            
            });
          }
          
          return ['one ${await this.helpers.returnSingularized(
            tableName,
          )} added!'];          
  }

    async findAll(
      attributes: string,
      includes: string,
      iattributes: string,
      isDropDown = false,
      page: number, 
      size: number, 
      field: string, 
      search: string,
      payload: any) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:` +
      '`%${search}%`' +
      ` }}
        : {};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;    
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: '${tableName}',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canRead = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Read',
      //     is_active:true,
      //   },
      // });
      // if (!canRead) throw new UnauthorizedException();
      const data = await this.${await this.helpers.uncapitalizeFirstLetter(
        tableName,
      )}.findAndCountAll({        
        order: [['id', 'DESC']],
        attributes: attributes ? JSON.parse(attributes) : null,
        include: [${arrayOfIncludes}],
        where: condition,
        limit,
        offset,
      });
      const count = data.count;
      const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }),'${tableName}'),
    );
      const response = this.helpers.getPagingData(isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => m.get({ plain: true })),
              JSON.parse(attributes)[1],
              'label',
            ),
          }
        : { count: count, rows: plain }, page, limit,'${tableName}');
      return response || {};
    
  }

    async findOne(id: number, payload: any) {       
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: '${tableName}',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canRead = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Read',
      //     is_active:true,
      //   },
      // });
      // if (!canRead) throw new UnauthorizedException();
      const response = await this.${await this.helpers.uncapitalizeFirstLetter(
        tableName,
      )}.findOne({
            where: {
              id,              
            },
            attributes: {
        exclude: [
          'is_active',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
        ],
      },
            include: [${arrayOfIncludes2}],
          });
          return response || {};
      
    }

  async update(id: number, update${modelName}Dto: Update${modelName}Dto,payload: any,assets: any) {   
      // const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: '${tableName}',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canUpdate = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Update',
      //     is_active:true,
      //   },
      // });
      // if (!canUpdate) throw new UnauthorizedException();
      if (assets.length > 0) {
        const file_name = assets[0].filename
        const photo = process.env.BASE_URL + 'images/users/' + file_name;            
        await this.${await this.helpers.uncapitalizeFirstLetter(
          tableName,
        )}.update({
          ...update${modelName}Dto,
          ${
            fileField.length ? fileField[0]['field'] + ': photo,' : ''
          }             
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,            
        },
        { where: { id }, returning: true },
        );    
      }
      else{
        await this.${await this.helpers.uncapitalizeFirstLetter(
          tableName,
        )}.update({
          ...update${modelName}Dto,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,     
        },
          { where: { id }, returning: true },
        );
      }      

    return ["${tableName} updated!"];
    
  }

  async remove(id: number, payload: any) {     
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: '${tableName}',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canDelete = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Delete',
      //     is_active:true,
      //   },
      // });
      // if (!canDelete) throw new UnauthorizedException();
      const response = await this.${await this.helpers.uncapitalizeFirstLetter(
        tableName,
      )}.update(
            {
                is_active: 0,
                deleted_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
              },
              { where: { id } },
            );
            return ["one record deleted from ${tableName}!"];
    }
  }
  \n`;

    await this.createUserService(
      tableName,
      serviceFileData,
      modulePath,
      association,
    );

    // we have to update the all the associate model service files also
    // creating service is done.
    // association has the models this model belongs to.

    if (association.length > 0) {
      await this.updateAssociateService(association as string[], modelName);
    }

    //Now let's write the controller file

    const controllerFileData = `/* eslint-disable prettier/prettier */
    import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from '../ade-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ${modelName}Service } from './${tableName}.service';
import { Create${modelName}Dto } from './dto/create-${tableName}.dto';
import { Update${modelName}Dto } from './dto/update-${tableName}.dto';

@Controller('${tableName}')
export class ${modelName}Controller {
  constructor(private readonly ${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service: ${modelName}Service) {}\n`;

    const createController = formData
      ? `@UseGuards(JwtAuthGuard)
@Post()
@UseInterceptors(AnyFilesInterceptor({
storage: diskStorage({
  destination: './uploads/users/'
  , filename: (req, file, cb) => {
    const randomName = Array(32).fill(null).map(() => (
      Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null,` +
        ' `${randomName}${extname(file.originalname)}`);\n}\n})\n}))' +
        `
    @UsePipes(new ValidationPipe({ transform: true }))
async create(@UploadedFiles() assets,@Body() create${modelName}Dto: Create${modelName}Dto, @Request() req) {
return await this.${await this.helpers.uncapitalizeFirstLetter(
          modelName,
        )}Service.create(create${modelName}Dto, req.user, assets);
}`
      : ` \n@Post()\n@UseGuards(JwtAuthGuard)\n async create(@Body() create${modelName}Dto: Create${modelName}Dto, @Request() req) {
return await this.${await this.helpers.uncapitalizeFirstLetter(
          modelName,
        )}Service.create(create${modelName}Dto, req.user,[]);
}\n`;

    const getController = `@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service.findOne(+id, req.user);
}\n`;

    const updateController = formData
      ? `
@UseGuards(JwtAuthGuard)
@Patch(':id')
@UseInterceptors(AnyFilesInterceptor({
  storage: diskStorage({
    destination: './uploads/users/'
    , filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (
        Math.round(Math.random() * 16)).toString(16)).join('');
      cb(null,` +
        ' `${randomName}${extname(file.originalname)}`);}})}))' +
        `
      @UsePipes(new ValidationPipe({ transform: true }))
async update( @Param('id') id: string,@UploadedFiles() assets,@Body() update${modelName}Dto: Update${modelName}Dto, @Request() req) {
  return await this.${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service.update(+id, update${modelName}Dto, req.user,assets);
}`
      : `@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() update${modelName}Dto: Update${modelName}Dto, @Request() req) {
  return await this.${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service.update(+id, update${modelName}Dto, req.user,[]);
}\n`;
    const restController = `
@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.${await this.helpers.uncapitalizeFirstLetter(
    modelName,
  )}Service.remove(+id, req.user);
}

}
`;
    // write the controller
    await this.createUserController(
      tableName,
      controllerFileData +
        createController +
        getController +
        updateController +
        restController,
      modulePath,
    );

    // now, lets write the module to import the crud controller and service

    const moduleFileData = `/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelpersModule } from 'src/helpers/helpers/helpers.module';
import { ${modelName}Controller } from './${tableName}.controller';
import { ${modelName}Service } from './${tableName}.service';
import { ${modelName} } from './${tableName}.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeTables } from '../ade_tables/ade_tables.model';

@Module({
  imports: [SequelizeModule.forFeature([${modelName}, AdeRoleTable, AdeTables]), HelpersModule],
  providers: [${modelName}Service],
  controllers: [${modelName}Controller],
})
export class ${modelName}Module {}
    `;

    const newModule = await this.helpers.createFile(
      `src/modules/${tableName}/`,
      `${tableName}.module.ts`,
      moduleFileData,
    );

    // we can now safely add the modul to app.module
    return await this.addModuleToApp(tableName);
  }

  async createUserDto(dtoName: string, dtoData: string, dtoPath: string) {
    const newDto = await this.helpers.createFile(
      dtoPath,
      `${dtoName}`,
      dtoData,
    );
    return { DtoPath: newDto };
  }

  async createUserController(
    controllerName: string,
    controllerData: string,
    controllerPath: string,
  ) {
    const newController = await this.helpers.createFile(
      controllerPath,
      `${controllerName}.controller.ts`,
      controllerData,
    );
    return { controllerPath: newController };
  }

  async updateAssociateService(associates: string[], modelName: string) {
    // const modelPath = `src/modules/${this.helpers.toSnakeCase(
    //   modelName,
    // )}/${this.helpers.toSnakeCase(modelName)}.model`;
    const modelPath = `src/modules/${modelName}/${modelName}.model`;
    for (let i = 0; i < associates.length; i++) {
      // open the associate service file
      // const fileName = `src/modules/${this.helpers.toSnakeCase(
      //   associates[i],
      // )}/${this.helpers.toSnakeCase(associates[i])}.service.ts`;
      const fileName = `src/modules/${associates[i]}/${associates[i]}.service.ts`;
      const importString = `import {${modelName}} from '${modelPath}';\n`;
      const splitter = 'include: [';

      const data = await this.helpers.splitFileTextByWord(fileName, splitter);
      if (data[0].includes(modelPath) === false)
        await this.helpers.insertAtLine(fileName, 1, importString);
      if (data[1].includes(modelName)) continue;
      const result = [];
      const data2 = fs.readFileSync(fileName).toString().split('include: [');
      // const overwriteString = `include: [{model:${modelName},attributes: {
      //   exclude: [
      //     'is_active',
      //     'created_at',
      //     'created_by',
      //     'updated_at',
      //     'updated_by',
      //     'deleted_at',
      //   ],
      // },},`;
      const overwriteString = `include: [`;
      let finalData = '';
      for (let j = 0; j < data2.length; j++) {
        if (j === data2.length - 1) {
          finalData += data2[j];
          break;
        }
        finalData += data2[j] + overwriteString;
      }
      const writeFile = promisify(fs.writeFile);
      await writeFile(fileName, finalData, 'utf8');
    }
  }

  async createUserService(
    serviceName: string,
    serviceData: string,
    servicePath: string,
    associateTable: string[],
  ) {
    const newService = await this.helpers.createFile(
      servicePath,
      `${serviceName}.service.ts`,
      serviceData,
    );

    return { ServicePath: newService };
  }

  async addModuleToApp(tableName: string) {
    const moduleName = await this.helpers.capitalizeFirstLetter(tableName);
    const fileName = 'src/app.module.ts';
    const modulePath = `src/modules/${tableName}/${tableName}.module`;
    const importString = `import { ${moduleName}Module } from '${modulePath}';\n`;
    const splitter = 'models:';

    const data = await this.helpers.splitFileTextByWord(fileName, splitter);
    // data[1] is our work area

    if (data[0].includes(modulePath) === false) {
      await this.helpers.insertAtLine(fileName, 1, importString);
    }
    if (data[1].includes(`${moduleName}Module`)) return true;
    const data2 = await this.helpers.splitFileTextByWord(
      fileName,
      'CreateTableModule,',
    );
    const temp = 'CreateTableModule,' + `${moduleName}Module` + ',';
    const finalData = data2[0] + temp + data2[1];
    const writeFile = promisify(fs.writeFile);
    await writeFile(fileName, finalData, 'utf8');
    return true;
  }

  async returnColumnFieldType(field: string) {
    switch (field) {
      case T_NUMBER:
        return D_INT;
      case T_STRING:
        return D_STRING;
      case T_TEXT:
        return D_TEXT;
      case T_BOOL:
        return D_BOOL;
      case T_DATE:
        return D_DATE;
      case T_TIME:
        return D_TIME;
      case T_FILE:
        return D_STRING;
      case T_UUID:
        return D_UUID;
      default:
        return null;
    }
  }

  async returnSequelizeDataType(field: string) {
    switch (field) {
      case T_NUMBER:
        return sequelize.INTEGER;
      case 'double':
        return sequelize.DOUBLE;
      case 'float':
        return sequelize.FLOAT;
      case 'decimal':
        return sequelize.DECIMAL;
      case 'smallint':
        return sequelize.SMALLINT;
      case 'tinyint':
        return sequelize.TINYINT;
      case T_STRING:
        return sequelize.STRING;
      case T_TEXT:
        return sequelize.TEXT;
      case T_BOOL:
        return sequelize.BOOLEAN;
      case T_DATE:
        return sequelize.DATE;
      case T_TIME:
        return sequelize.TIME;
      case T_FILE:
        return sequelize.STRING;
      case T_UUID:
        return S_UUID;
      default:
        return null;
    }
  }
}
