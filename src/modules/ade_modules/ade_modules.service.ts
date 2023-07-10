/* eslint-disable prettier/prettier */
import { AdeUserModule } from 'src/modules/ade_user_module/ade_user_module.model';
import { AdeRoleModule } from 'src/modules/ade_role_module/ade_role_module.model';

import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';
import slugify from 'slugify';

import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeModules } from './ade_modules.model';
import { CreateAdeModulesDto } from './dto/create-ade_modules.dto';
import { UpdateAdeModulesDto } from './dto/update-ade_modules.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeRoles } from '../ade_roles/ade_roles.model';
@Injectable()
export class AdeModulesService {
  constructor(
    @InjectModel(AdeModules)
    private ade_modules: typeof AdeModules,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(AdeRoleModule)
    private adeRoleModule: typeof AdeRoleModule,
    @InjectModel(AdeRoles)
    private adeRoles: typeof AdeRoles,
    private helpers: HelpersService,
  ) {}
  async create(createAdeModulesDto: CreateAdeModulesDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_modules' },
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
    const module_dto = createAdeModulesDto;
    module_dto.module_url = slugify(createAdeModulesDto.module_name);
    const response = await this.ade_modules.create({
      ...module_dto,
      created_by: payload.sub,
    });
    return 'data added!';
  }

  async findAll(
    all: number,
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
    //   where: { table_name: 'ade_modules' },
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
    const data = await this.ade_modules.findAndCountAll({
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
      // include: [
      //   {
      //     model: AdeMenus,
      //     attributes: {
      //       exclude: [
      //         'is_active',
      //         'created_at',
      //         'created_by',
      //         'updated_at',
      //         'updated_by',
      //         'deleted_at',
      //       ],
      //     },
      //   },
      // ],
      where: condition,
      limit,
      offset,
    });
    //console.log(data);
    const allowedModules = await this.adeRoleModule.findAll({
      where: {
        ade_roles_id: 1,
        accesible: 1,
        // is_active: 1,
      },
      attributes: ['ade_modules_id'],
    });

    const plainData = data.rows.map((m) => m.get({ plain: true }));
    console.log(plainData);
    const plainModules = allowedModules.map((m) => m.get({ plain: true }));
    const plainModulIds = plainModules.map((m) => m.ade_modules_id);
    const temp = plainData.filter((ele) => {
      const allowed = plainModulIds.includes(ele.id);
      if (allowed) return ele;
    });
    const default_module = await this.adeRoles.findOne({
      attributes: ['default_module_id'],
      where: { id: 1 },
    });

    const response = this.helpers.getPagingData(
      all == 1
        ? data
        : {
            count: temp.length,
            rows: temp.map((m) => {
              return m.id == default_module.default_module_id
                ? { ...m, default_module: true }
                : { ...m, default_module: false };
              //return m;
            }),
          },
      page,
      limit,
      'ade_modules',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_modules' },
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
    const response = await this.ade_modules.findOne({
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
        //{ model: AdeUserModule },
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
          model: AdeMenus,
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

  async update(
    id: number,
    updateAdeModulesDto: UpdateAdeModulesDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_modules' },
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
    const response = await this.ade_modules.update(
      {
        ...updateAdeModulesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_modules' },
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
    const response = await this.ade_modules.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
