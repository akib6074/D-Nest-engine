/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoleMenu } from './ade_role_menu.model';
import { CreateAdeRoleMenuDto } from './dto/create-ade_role_menu.dto';
import { UpdateAdeRoleMenuDto } from './dto/update-ade_role_menu.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';
import { BulkCreateAdeRoleMenuDto } from './dto/bulk-create-ade_role_menu.dto';
@Injectable()
export class AdeRoleMenuService {
  constructor(
    @InjectModel(AdeRoleMenu)
    private ade_role_menu: typeof AdeRoleMenu,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeRoleMenuDto: CreateAdeRoleMenuDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_menu' },
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
    const response = await this.ade_role_menu.create({
      ...createAdeRoleMenuDto,
      created_by: payload.sub,
    });
    return 'data added!';
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
    //   where: { table_name: 'ade_role_menu' },
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
    const data = await this.ade_role_menu.findAndCountAll({
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
      include: [
        {
          model: AdeRoles,
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
      where: condition,
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'ade_role_menu',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_menu' },
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
    const response = await this.ade_role_menu.findOne({
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
        {
          model: AdeRoles,
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
    updateAdeRoleMenuDto: UpdateAdeRoleMenuDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_menu' },
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
    const response = await this.ade_role_menu.update(
      {
        ...updateAdeRoleMenuDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async bulkUpdate(
    bulkCreateAdeRoleMenuDto: BulkCreateAdeRoleMenuDto,
    payload: any,
  ) {
    // console.log(bulkCreateAdeRoleMenuDto);
    const response = await this.ade_role_menu.update(
      {
        accessible: bulkCreateAdeRoleMenuDto.accessible,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      {
        where: {
          role_id: bulkCreateAdeRoleMenuDto.role_id,
          menu_id: bulkCreateAdeRoleMenuDto.menus,
        },
        returning: true,
      },
    );
    return 'all data updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_menu' },
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
    const response = await this.ade_role_menu.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed';
  }
}
