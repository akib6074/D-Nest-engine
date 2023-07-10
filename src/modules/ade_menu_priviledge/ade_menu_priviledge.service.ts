/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeMenuPriviledge } from './ade_menu_priviledge.model';
import { CreateAdeMenuPriviledgeDto } from './dto/create-ade_menu_priviledge.dto';
import { UpdateAdeMenuPriviledgeDto } from './dto/update-ade_menu_priviledge.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';
import { AdeApis } from '../ade_apis/ade_apis.model';
import { AdeRoleApi } from '../ade_role_api/ade_role_api.model';
import * as moment from 'moment';
@Injectable()
export class AdeMenuPriviledgeService {
  constructor(
    @InjectModel(AdeMenuPriviledge)
    private ade_menu_priviledge: typeof AdeMenuPriviledge,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(AdeMenus)
    private adeMenus: typeof AdeMenus,
    @InjectModel(AdeApis)
    private adeApis: typeof AdeApis,
    @InjectModel(AdeRoleApi)
    private adeRoleApi: typeof AdeRoleApi,
    private helpers: HelpersService,
  ) {}
  async create(
    createAdeMenuPriviledgeDto: CreateAdeMenuPriviledgeDto[],
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //     //is_active: true,
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();
    await this.ade_menu_priviledge.update(
      {
        is_active: 0,
        deleted_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
      {
        where: {
          role_id: createAdeMenuPriviledgeDto[0].role_id,
          module_id: createAdeMenuPriviledgeDto[0].module_id,
        },
      },
    );
    //console.log('soft delete')
    // await this.ade_menu_priviledge.destroy({
    //   where: {
    //     role_id: createAdeMenuPriviledgeDto[0].role_id,
    //     module_id: createAdeMenuPriviledgeDto[0].module_id,
    //   },
    // });
    const priviledgeData = createAdeMenuPriviledgeDto.map((obj) => ({
      ...obj,
      created_by: payload.sub,
    }));
    // const response = await this.ade_menu_priviledge.bulkCreate({
    //   ...createAdeMenuPriviledgeDto,
    //   created_by: payload.sub,
    // });
    const response = await this.ade_menu_priviledge.bulkCreate(priviledgeData);
    const apiIds = [];
    for (const item of createAdeMenuPriviledgeDto) {
      try {
        const menu = await this.adeApis.findOne({
          where: {
            menu_id: item.menu_id,
          },
          attributes: ['id'],
        });
        //console.log(menu.id);
        if (menu?.id !== undefined)
          apiIds.push({ api_id: menu.id, role_id: item.role_id });
      } catch (e) {
        console.log(e);
      }
    }
    // console.log(apiIds);

    await this.adeRoleApi.destroy({
      where: {
        role_id: createAdeMenuPriviledgeDto[0].role_id,
      },
    });

    await this.adeRoleApi.bulkCreate(apiIds);

    return 'one ade_menu_priviledge added!';
    //return apiIds;
  }

  async findMenusByRoleModule(
    role_id: number,
    module_id: number,
    active: boolean,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     // is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_menu_priviledge.findAll({
      attributes: ['menu_id'],
      where: {
        role_id: role_id,
        module_id: module_id,
        is_active: true,
      },
    });
    const menus = await this.adeMenus.findAll({
      order: [['menu_order', 'ASC']],
      attributes: [
        'id',
        'menu_name',
        'menu_name_bn',
        'menu_url',
        'menu_icon_url',
        'menu_order',
        'parent_menu',
      ],
    });
    const plainData = data
      .map((m) => m.get({ plain: true }))
      .map((m) => m.menu_id);
    //console.log(plainData);
    const temp = menus
      .map((m) => m.get({ plain: true }))
      .map((obj) => {
        const allowed = plainData.includes(obj.id);
        //console.log(allowed);
        return { ...obj, granted: allowed };
      });
    if (active) {
      const allowedMenus = temp.filter((el) => el.granted === true);
      return this.helpers.treeData(allowedMenus);
    }
    const menutree = this.helpers.treeData(temp);
    return menutree;
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
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     //is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_menu_priviledge.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes ? JSON.parse(attributes) : null,
      include: [
        {
          model: AdeMenus,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeMenus'))
              ]
            : [],
        },
        {
          model: AdeRoles,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeRoles'))
              ]
            : [],
        },
        {
          model: AdeModules,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeModules'))
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
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_menu_priviledge'),
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
      'ade_menu_priviledge',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //     // is_active: true,
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const response = await this.ade_menu_priviledge.findOne({
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
        { model: AdeMenus, attributes: [] },
        { model: AdeRoles, attributes: [] },
        { model: AdeModules, attributes: [] },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateAdeMenuPriviledgeDto: UpdateAdeMenuPriviledgeDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canUpdate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Update',
    //     // is_active: true,
    //   },
    // });
    // if (!canUpdate) throw new UnauthorizedException();
    const response = await this.ade_menu_priviledge.update(
      {
        ...updateAdeMenuPriviledgeDto,
        // updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'ade_menu_priviledge updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menu_priviledge' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canDelete = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Delete',
    //     //is_active: true,
    //   },
    // });
    // if (!canDelete) throw new UnauthorizedException();
    const response = await this.ade_menu_priviledge.destroy({ where: { id } });
    return 'one record deleted from ade_menu_priviledge!';
  }
}
