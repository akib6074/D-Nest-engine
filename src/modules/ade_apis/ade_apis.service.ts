/* eslint-disable prettier/prettier */
import { AdeRoleApi } from 'src/modules/ade_role_api/ade_role_api.model';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeApis } from './ade_apis.model';
import { CreateAdeApisDto } from './dto/create-ade_apis.dto';
import { UpdateAdeApisDto } from './dto/update-ade_apis.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
@Injectable()
export class AdeApisService {
  constructor(
    @InjectModel(AdeApis)
    private ade_apis: typeof AdeApis,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeApisDto: CreateAdeApisDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_apis', is_active: true },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //     // is_active:true,
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();
    const response = await this.ade_apis.create({
      ...createAdeApisDto,
      created_by: payload.sub,
    });
    return 'one ade_api added!';
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
    payload: any,
  ) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` } }
      : {};
    const { limit, offset } = this.helpers.getPagination(page, size);
    const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_apis' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     //is_active:true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_apis.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes ? JSON.parse(attributes) : null,
      include: [
        {
          model: AdeRoleApi,
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
        },
      ],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_apis'),
    );
    const response = this.helpers.getPagingData(
      isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => m.get({ plain: true })),
              JSON.parse(attributes)[1],
              'label',
            ),
          }
        : { count: count, rows: plain },
      page,
      limit,
      'ade_apis',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_apis' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     // is_active:true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const response = await this.ade_apis.findOne({
      where: {
        id,
        // is_active: 1,
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
      include: [
        {
          model: AdeRoleApi,
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
        },
      ],
    });
    return response || {};
  }

  async update(id: number, updateAdeApisDto: UpdateAdeApisDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_apis' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canUpdate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Update',
    //     //is_active:true,
    //   },
    // });
    // if (!canUpdate) throw new UnauthorizedException();
    const response = await this.ade_apis.update(
      {
        ...updateAdeApisDto,
        // updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'ade_apis updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_apis' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canDelete = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Delete',
    //     //is_active:true,
    //   },
    // });
    // if (!canDelete) throw new UnauthorizedException();
    const response = await this.ade_apis.destroy(
      // {
      //     is_active: 0,
      //     deleted_at: sequelize.fn('NOW'),
      //   },
      { where: { id } },
    );
    return 'one record deleted from ade_apis!';
  }
}
