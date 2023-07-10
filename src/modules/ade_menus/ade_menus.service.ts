/* eslint-disable prettier/prettier */
import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';
import { AdeRoleMenu } from 'src/modules/ade_role_menu/ade_role_menu.model';
import slugify from 'slugify';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeMenus } from './ade_menus.model';
import { CreateAdeMenusDto } from './dto/create-ade_menus.dto';
import { UpdateAdeMenusDto } from './dto/update-ade_menus.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';
import { SingleUpdateAdeMenusDto } from './dto/bulk-update-ade_menus.dto';
import { AdeApis } from '../ade_apis/ade_apis.model';
import { UpdateAdeApisDto } from '../ade_apis/dto/update-ade_apis.dto';
import { AdeRoleApi } from '../ade_role_api/ade_role_api.model';

@Injectable()
export class AdeMenusService {
  constructor(
    @InjectModel(AdeMenus)
    private ade_menus: typeof AdeMenus,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(AdeApis)
    private adeApis: typeof AdeApis,
    @InjectModel(AdeRoleApi)
    private adeRoleApi: typeof AdeRoleApi,
    private helpers: HelpersService,
  ) {}

  async create(createAdeMenusDto: CreateAdeMenusDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();

    const existingMenus = await this.ade_menus.findAll({
      where: {
        //module_id: createAdeMenusDto.module_id,
        parent_menu: createAdeMenusDto.parent_menu,
      },
    });
    let data;
    if (existingMenus.length) {
      data = await this.ade_menus.create({
        ...createAdeMenusDto,
        menu_order: existingMenus[existingMenus.length - 1].menu_order + 1,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
    } else {
      data = await this.ade_menus.create({
        ...createAdeMenusDto,
        menu_order: 0,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
    }
    return `record added to ade_menus successfully!`;
  }

  async createMasterDataMenu(
    createAdeMenusDto: CreateAdeMenusDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();

    const masterMenu = `${slugify(createAdeMenusDto.menu_name)}/masterdata`;
    const gridMenuUrl = `${slugify(
      createAdeMenusDto.menu_name,
    )}/masterdata/view?slug_name=${createAdeMenusDto.menu_url}&slug_type=grid`;
    const createMenuUrl = `${slugify(
      createAdeMenusDto.menu_name,
    )}/masterdata/create?slug_name=${
      createAdeMenusDto.menu_url
    }&slug_type=create`;
    const parentMenus = await this.ade_menus.findAll({
      where: { parent_menu: 0 },
      order: [['menu_order', 'DESC']],
      attributes: ['menu_order'],
    });

    const thisParent = await this.ade_menus.create({
      ...createAdeMenusDto,
      menu_url: masterMenu,
      menu_order: parentMenus[0].menu_order + 1,
      parent_menu: 0,
      created_by: payload.sub,
    });

    const viewMenu = await this.ade_menus.create({
      ...createAdeMenusDto,
      menu_name: 'View',
      menu_url: gridMenuUrl,
      menu_order: 0,
      parent_menu: thisParent.id,
      created_by: payload.sub,
    });

    await this.adeApis.update(
      {
        menu_id: viewMenu.id,
      },
      {
        where: { table_name: createAdeMenusDto.table_name, api_method: 'GET' },
        returning: true,
      },
    );

    const createMenu = await this.ade_menus.create({
      ...createAdeMenusDto,
      menu_name: 'Create',
      menu_url: createMenuUrl,
      menu_order: 1,
      parent_menu: thisParent.id,
      created_by: payload.sub,
    });

    await this.adeApis.update(
      {
        menu_id: createMenu.id,
      },
      {
        where: { table_name: createAdeMenusDto.table_name, api_method: 'POST' },
        returning: true,
      },
    );

    const apiData = await this.adeApis.findAll({
      where: {
        table_name: createAdeMenusDto.table_name,
        api_path: `/api/v1/${createAdeMenusDto.table_name}`,
      },
      attributes: ['id'],
    });

    const roleApiData = apiData
      .map((m) => m.get({ plain: true }))
      .map((el) => {
        return { api_id: el.id, role_id: payload.role };
      });

    await this.adeRoleApi.bulkCreate(roleApiData);

    return `record added to ade_menus successfully!`;
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
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_menus.findAndCountAll({
      order: [['menu_order', 'ASC']],
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
      where: condition,
      limit,
      offset,
    });
    const temp = data.rows.map((m) => m.get({ plain: true }));
    const result = this.helpers.treeData(temp);
    data['rows'] = result;
    const response = this.helpers.getPagingData(data, page, limit, 'ade_menus');
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_menus.findOne({
      where: {
        id,
        is_active: 1,
      },
      include: [
        {
          model: AdeMenuPriviledge,
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
        { model: AdeRoleMenu },
        { model: AdeModules },
      ],
    });
    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'ade_menus',
    );
    return response;
  }

  async findByModuleAndParentId(mid: number, pid: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo)
    //   throw new ForbiddenException("You don't have CRUD access to this table!");
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //   },
    // });
    // if (!canRead)
    //   throw new UnauthorizedException(
    //     "You don't have read access to this table!",
    //   );
    const data = await this.ade_menus.findAndCountAll({
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
      where: {
        //module_id: mid,
        parent_menu: pid,
        is_active: 1,
      },
    });
    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'ade_menus',
    );

    return response;
  }

  async update(id: number, updateAdeMenusDto: UpdateAdeMenusDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canUpdate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Update',
    //   },
    // });
    // if (!canUpdate) throw new UnauthorizedException();
    const data = await this.ade_menus.update(
      {
        ...updateAdeMenusDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'ade_menus',
    );

    return response;
  }

  async bulkUpdate(
    bulkUpdateAdeMenusDto: SingleUpdateAdeMenusDto[],
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canUpdate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Update',
    //   },
    // });
    // if (!canUpdate) throw new UnauthorizedException();
    const statements = [];
    const tableName = 'ade_menus';
    const flattenedMenus = this.helpers.getMembers(bulkUpdateAdeMenusDto);
    for (let i = 0; i < flattenedMenus.length; i++) {
      statements.push(
        this.ade_menus.sequelize.query(
          `UPDATE ${tableName} 
      SET menu_order=${flattenedMenus[i].menu_order},
      parent_menu=${flattenedMenus[i].parent_menu} 
      WHERE id=${flattenedMenus[i].id};`,
        ),
      );
    }
    const data = await Promise.all(statements);
    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'ade_menus',
    );
    return response;
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_menus' },
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
    const data = await this.ade_menus.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    const { limit, offset } = this.helpers.getPagination(0, 1000);
    const response = this.helpers.getPagingData(
      data,
      offset,
      limit,
      'ade_menus',
    );

    return response;
  }
}
