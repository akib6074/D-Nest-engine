/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeUserModule } from './ade_user_module.model';
import { CreateAdeUserModuleDto } from './dto/create-ade_user_module.dto';
import { UpdateAdeUserModuleDto } from './dto/update-ade_user_module.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeUsers } from 'src/modules/ade_users/ade_users.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';
@Injectable()
export class AdeUserModuleService {
  constructor(
    @InjectModel(AdeUserModule)
    private ade_user_module: typeof AdeUserModule,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeUserModuleDto: CreateAdeUserModuleDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_user_module' },
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
    const response = await this.ade_user_module.create({
      ...createAdeUserModuleDto,
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
    //   where: { table_name: 'ade_user_module' },
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
    const data = await this.ade_user_module.findAndCountAll({
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
          model: AdeUsers,
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
          model: AdeModules,
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
      'ade_user_module',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_user_module' },
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
    const response = await this.ade_user_module.findOne({
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
          model: AdeUsers,
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
          model: AdeModules,
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
    updateAdeUserModuleDto: UpdateAdeUserModuleDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_user_module' },
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
    const response = await this.ade_user_module.update(
      {
        ...updateAdeUserModuleDto,
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_user_module' },
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
    const response = await this.ade_user_module.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
