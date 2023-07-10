/* eslint-disable prettier/prettier */
import { AdeRoleApi } from 'src/modules/ade_role_api/ade_role_api.model';

import { AdeRoleModule } from 'src/modules/ade_role_module/ade_role_module.model';

import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';
import { AdeRoleMenu } from 'src/modules/ade_role_menu/ade_role_menu.model';

import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';

import { AdeUsers } from 'src/modules/ade_users/ade_users.model';

import {
  ForbiddenException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoles } from './ade_roles.model';
import { CreateAdeRolesDto } from './dto/create-ade_roles.dto';
import { UpdateAdeRolesDto } from './dto/update-ade_roles.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeModules } from '../ade_modules/ade_modules.model';
@Injectable()
export class AdeRolesService {
  constructor(
    @InjectModel(AdeRoles)
    private ade_roles: typeof AdeRoles,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(AdeModules)
    private adeModule: typeof AdeModules,
    @InjectModel(AdeRoleModule)
    private adeRoleModule: typeof AdeRoleModule,
    private helpers: HelpersService,
  ) {}
  async create(createAdeRolesDto: CreateAdeRolesDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_roles' },
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
    const response = await this.ade_roles.create({
      ...createAdeRolesDto,
      created_by: payload.sub,
    });

    const { id, role_name } = response.get({ plain: true });
    const createAdeRoleModuleDto = [];
    for (let i = 0; i < createAdeRolesDto.modules.length; i++) {
      createAdeRoleModuleDto.push({
        accesible: 1,
        ade_roles_id: id,
        ade_modules_id: createAdeRolesDto.modules[i],
      });
    }

    await this.adeRoleModule.bulkCreate(createAdeRoleModuleDto);
    return 'data added!';
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
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);

    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_roles' },
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

    const data = await this.ade_roles.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes
        ? JSON.parse(attributes)
        : ['id', 'role_name', 'default_module_id'],
      include: [],
      where: condition,
      limit,
      offset,
    });
    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_roles'),
    );

    for (let i = 0; i < plain.length; i++) {
      const roleId = plain[i]['ade_roles__id'];
      const moduelIds = await this.adeRoleModule.findAll({
        where: { ade_roles_id: roleId },
        attributes: ['ade_modules_id'],
      });

      const moduleIdPlain = moduelIds.map((m) => m.get({ plain: true }));
      const mIdNames = [];
      for (let n = 0; n < moduleIdPlain.length; n++) {
        const mIdName = await this.adeModule.findOne({
          where: {
            id: moduleIdPlain[n].ade_modules_id,
          },
          attributes: ['id', 'module_name'],
        });
        mIdNames.push(mIdName);
      }

      plain[i]['modules'] = mIdNames.map((m) => m.get({ plain: true }));
    }

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
      'ade_roles',
    );
    return response || {};
    // return this.helpers.changeSpecificKeyOfObjectArray(
    //   data.rows.map((m) => m.get({ plain: true })),
    //   JSON.parse(attributes)[1],
    //   'label',
    // );
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_roles' },
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
    const response = await this.ade_roles.findOne({
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
        id,
        is_active: 1,
      },
      include: [
        // { model: AdeRoleMenu },
        // { model: AdeRoleTable },
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
        {
          model: AdeRoleModule,
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
        {
          model: AdeUsers,
          attributes: {
            exclude: [
              'password',
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

  async update(id: number, updateAdeRolesDto: UpdateAdeRolesDto, payload: any) {
    const response = await this.ade_roles.update(
      {
        ...updateAdeRolesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );
    const updateAdeRoleModuleDto = [];
    for (let i = 0; i < updateAdeRolesDto.modules.length; i++) {
      updateAdeRoleModuleDto.push({
        accesible: 1,
        ade_roles_id: id,
        ade_modules_id: updateAdeRolesDto.modules[i],
      });
    }
    await this.adeRoleModule.destroy({
      where: {
        ade_roles_id: id,
      },
    });
    await this.adeRoleModule.bulkCreate(updateAdeRoleModuleDto);

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const response = await this.ade_roles.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    await this.adeRoleModule.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { ade_roles_id: id } },
    );
    return 'data removed!';
  }
}
