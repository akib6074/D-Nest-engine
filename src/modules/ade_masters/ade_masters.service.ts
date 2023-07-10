/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeMasters } from './ade_masters.model';
import { CreateAdeMastersDto } from './dto/create-ade_masters.dto';
import { UpdateAdeMastersDto } from './dto/update-ade_masters.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeApis } from '../ade_apis/ade_apis.model';
import { CreateAdeApisDto } from '../ade_apis/dto/create-ade_apis.dto';
import * as moment from 'moment';
@Injectable()
export class AdeMastersService {
  constructor(
    @InjectModel(AdeMasters)
    private ade_masters: typeof AdeMasters,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(AdeApis)
    private adeApis: typeof AdeApis,
    private helpers: HelpersService,
  ) {}
  async create(createAdeMastersDto: CreateAdeMastersDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //     is_active: true,
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();
    const tableAttributs = createAdeMastersDto.query_tables[0].fieldList
      .filter((field) => field.include === true)
      .map((f) => f.fieldName);

    const tableColumns = createAdeMastersDto.query_tables.map((f) =>
      f.fieldList
        .filter((field) => field.include === true)
        .map((f) => f.columnName),
    );

    const tableColumnsBn = createAdeMastersDto.query_tables.map((f) =>
      f.fieldList
        .filter((field) => field.include === true)
        .map((f) => f.columnNameBn),
    );

    const attributes = encodeURIComponent(JSON.stringify(tableAttributs));
    const foreignTables = encodeURIComponent(
      JSON.stringify(
        createAdeMastersDto.query_tables.slice(1).map((f) => f.tableName),
      ),
    );
    //console.log(foreignTables);
    const foreignAttributes = encodeURIComponent(
      JSON.stringify(
        createAdeMastersDto.query_tables
          .slice(1)
          .map((f) =>
            f.fieldList
              .filter((item) => item.include === true)
              .map((a) => a.fieldName),
          ),
      ),
    );

    const gridUrl = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}?attributes=${attributes}&includes=${foreignTables}&iattributes=${foreignAttributes}`;
    const createUrl = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;
    const updateUrl = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;
    const getUpdateUrl = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;

    const viewApi = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;
    const createApi = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;
    const updateApi = `/api/v1/${createAdeMastersDto.query_tables[0].tableName}`;

    const createAdeApiDto: CreateAdeApisDto = {
      api_path: createApi,
      api_method: 'POST',
      table_name: createAdeMastersDto.query_tables[0].tableName,
      menu_id: null,
    };

    const viewAdeApiDto: CreateAdeApisDto = {
      api_path: createApi,
      api_method: 'GET',
      table_name: createAdeMastersDto.query_tables[0].tableName,
      menu_id: null,
    };

    const updateAdeApiDto: CreateAdeApisDto = {
      api_path: createApi,
      api_method: 'PATCH',
      table_name: createAdeMastersDto.query_tables[0].tableName,
      menu_id: null,
    };
    const adeApiInsertArray = [];
    adeApiInsertArray.push(viewAdeApiDto, createAdeApiDto, updateAdeApiDto);
    try {
      await this.adeApis.bulkCreate(adeApiInsertArray);
    } catch (r) {
      console.log(r);
    }

    const dto = createAdeMastersDto.query_tables.map((m) => {
      const tbname = m.tableName;
      const fields = m.fieldList.map((f) => {
        //console.log(f);
        const c = f.columnName;
        const bn = f.columnNameBn;
        const i = f.include;
        const n = m.tableName + '__' + f.fieldName;
        const s = f.sortOrder;
        return {
          columnName: c,
          columnNameBn: bn,
          fieldName: n,
          include: i,
          sortOrder: s,
        };
      });
      return { tableName: tbname, fieldList: fields };
    });

    const myTable = await Promise.all(
      createAdeMastersDto.primaryTable.fieldList.map(async (field) => {
        return field.fieldName === 'id'
          ? {
              ...field,
              include: false,
              fieldApi: field.foreignKey
                ? getDropDownApi(
                    await this.adeTables.findOne({
                      where: { id: field.foreign_table_id },
                      attributes: ['table_name'],
                    }),
                  )
                : '',
            }
          : {
              ...field,
              fieldApi: field.foreignKey
                ? getDropDownApi(
                    await this.adeTables.findOne({
                      where: { id: field.foreign_table_id },
                      attributes: ['table_name'],
                    }),
                  )
                : '',
            };
      }),
    );

    function getDropDownApi(fTable: AdeTables) {
      console.log(fTable);
      const fieldList = createAdeMastersDto.relatedTables.find(
        (tbName) => tbName.tableName === fTable.table_name,
      ).fieldList;
      return `/api/v1/${fTable.table_name}?attributes=${encodeURIComponent(
        JSON.stringify(['id', fieldList.find((f) => f.include).fieldName]),
      )}`;
    }

    createAdeMastersDto.relatedTables.forEach((f) => {
      f.fieldList.forEach((l) => {
        myTable.push({
          ...l,
          fieldApi: '',
        });
      });
    });
    try {
      const res = await this.ade_masters.findOne({
        where: {
          slug_name: createAdeMastersDto.slug_name,
          slug_type: 'grid',
          target_table: createAdeMastersDto.query_tables[0].tableName,
        },
      });
      if (res) {
        console.log('grid success');
        const gid = res.id;
        await this.ade_masters.update(
          {
            ...UpdateAdeMastersDto,
            grid_params: JSON.stringify(dto),
            grid_api: gridUrl,
            grid_columns: JSON.stringify(tableColumns),
            grid_columns_bn: JSON.stringify(tableColumnsBn),
            heading_name: createAdeMastersDto.heading_name[0],
            heading_name_bn: createAdeMastersDto.heading_name_bn[0],
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            updated_by: payload.sub,
          },
          { where: { id: gid }, returning: true },
        );
      } else {
        await this.ade_masters.create({
          ...createAdeMastersDto,
          grid_params: JSON.stringify(dto),
          grid_api: gridUrl,
          grid_columns: JSON.stringify(tableColumns),
          grid_columns_bn: JSON.stringify(tableColumnsBn),
          heading_name: createAdeMastersDto.heading_name[0],
          heading_name_bn: createAdeMastersDto.heading_name_bn[0],
          target_table: createAdeMastersDto.query_tables[0].tableName,
          created_by: payload.sub,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await this.ade_masters.findOne({
        where: {
          slug_name: createAdeMastersDto.slug_name,
          slug_type: 'create',
          target_table: createAdeMastersDto.query_tables[0].tableName,
        },
      });
      if (res) {
        console.log('create success');
        const gid = res.id;
        await this.ade_masters.update(
          {
            ...UpdateAdeMastersDto,
            create_params: JSON.stringify(myTable),
            grid_api: gridUrl,
            grid_columns: JSON.stringify(tableColumns),
            grid_columns_bn: JSON.stringify(tableColumnsBn),
            heading_name: createAdeMastersDto.heading_name[1],
            heading_name_bn: createAdeMastersDto.heading_name_bn[1],
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            updated_by: payload.sub,
          },
          { where: { id: gid }, returning: true },
        );
      } else {
        await this.ade_masters.create({
          ...createAdeMastersDto,
          slug_type: 'create',
          create_params: JSON.stringify(myTable),
          create_api: createUrl,
          grid_columns: JSON.stringify(tableColumns),
          grid_columns_bn: JSON.stringify(tableColumnsBn),
          heading_name: createAdeMastersDto.heading_name[1],
          heading_name_bn: createAdeMastersDto.heading_name_bn[1],
          target_table: createAdeMastersDto.query_tables[0].tableName,
          created_by: payload.sub,
        });
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await this.ade_masters.findOne({
        where: {
          slug_name: createAdeMastersDto.slug_name,
          slug_type: 'update',
          target_table: createAdeMastersDto.query_tables[0].tableName,
        },
      });
      if (res) {
        console.log('update success');
        const gid = res.id;
        await this.ade_masters.update(
          {
            ...UpdateAdeMastersDto,
            update_params: JSON.stringify(myTable),
            grid_api: gridUrl,
            grid_columns: JSON.stringify(tableColumns),
            grid_columns_bn: JSON.stringify(tableColumnsBn),
            heading_name: createAdeMastersDto.heading_name[2],
            heading_name_bn: createAdeMastersDto.heading_name_bn[2],
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            updated_by: payload.sub,
          },
          { where: { id: gid }, returning: true },
        );
      } else {
        const response = await this.ade_masters.create({
          ...createAdeMastersDto,
          slug_type: 'update',
          grid_api: getUpdateUrl,
          update_params: JSON.stringify(myTable),
          update_api: updateUrl,
          grid_columns: JSON.stringify(tableColumns),
          target_table: createAdeMastersDto.query_tables[0].tableName,
          heading_name: createAdeMastersDto.heading_name[2],
          heading_name_bn: createAdeMastersDto.heading_name_bn[2],
          created_by: payload.sub,
        });
      }
    } catch (e) {
      console.log(e);
    }

    //return decodeURIComponent(gridUrl);
    return ['Master Data Updated!'];
    //return paramsArray;
  }

  async findAll(
    page: number,
    size: number,
    field: string,
    search: string,
    payload: any,
  ) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_masters.findAndCountAll({
      order: [['id', 'DESC']],
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
      include: [],
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'ade_masters',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const response = await this.ade_masters.findOne({
      where: {
        id,
        is_active: 1,
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
      include: [],
    });
    return response || {};
  }

  async findBySlug(slug_name: string, slug_type: string, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException('table not found');
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const response = await this.ade_masters.findOne({
      where: {
        slug_name: slug_name,
        slug_type: slug_type,
        is_active: 1,
      },
      attributes: [
        `${slug_type}_params`,
        `${slug_type}_api`,
        'grid_columns',
        'grid_columns_bn',
        'heading_name',
        'heading_name_bn',
      ],
      include: [],
    });
    return response || {};
    //return {};
  }

  async update(
    id: number,
    updateAdeMastersDto: UpdateAdeMastersDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canUpdate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Update',
    //     is_active: true,
    //   },
    // });
    // if (!canUpdate) throw new UnauthorizedException();
    const response = await this.ade_masters.update(
      {
        ...updateAdeMastersDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'ade_masters updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_masters', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canDelete = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Delete',
    //     is_active: true,
    //   },
    // });
    // if (!canDelete) throw new UnauthorizedException();
    const response = await this.ade_masters.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'one record deleted from ade_masters!';
  }
}
