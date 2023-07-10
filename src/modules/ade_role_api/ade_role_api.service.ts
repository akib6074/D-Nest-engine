/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoleApi } from './ade_role_api.model';
import { CreateAdeRoleApiDto } from './dto/create-ade_role_api.dto';
import { UpdateAdeRoleApiDto } from './dto/update-ade_role_api.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeApis } from 'src/modules/ade_apis/ade_apis.model';
@Injectable()
export class AdeRoleApiService {
  constructor(
    @InjectModel(AdeRoleApi)
    private ade_role_api: typeof AdeRoleApi,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeRoleApiDto: CreateAdeRoleApiDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_api' },
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
    const response = await this.ade_role_api.create({
      ...createAdeRoleApiDto,
      created_by: payload.sub,
    });
    return 'one ade_role_api added!';
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
    //   where: { table_name: 'ade_role_api' },
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
    const data = await this.ade_role_api.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes ? JSON.parse(attributes) : null,
      include: [
        {
          model: AdeRoles,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeRoles'))
              ]
            : [],
        },
        {
          model: AdeApis,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeApis'))
              ]
            : [],
        },
      ],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_role_api'),
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
      'ade_role_api',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_api' },
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
    const response = await this.ade_role_api.findOne({
      where: {
        id,
        //is_active: 1,
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
        { model: AdeRoles, attributes: [] },
        { model: AdeApis, attributes: [] },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateAdeRoleApiDto: UpdateAdeRoleApiDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_api' },
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
    const response = await this.ade_role_api.update(
      {
        ...updateAdeRoleApiDto,
        //updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'ade_role_api updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_api' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canDelete = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Delete',
    //   },
    // });
    // if (!canDelete) throw new UnauthorizedException();
    const response = await this.ade_role_api.destroy(
      // {
      //     is_active: 0,
      //     deleted_at: sequelize.fn('NOW'),
      //   },
      { where: { id } },
    );
    return 'one record deleted from ade_role_api!';
  }
}
