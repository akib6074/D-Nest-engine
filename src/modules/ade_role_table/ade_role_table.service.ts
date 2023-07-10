/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoleTable } from './ade_role_table.model';
import { CreateAdeRoleTableDto } from './dto/create-ade_role_table.dto';
import { UpdateAdeRoleTableDto } from './dto/update-ade_role_table.dto';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';

@Injectable()
export class AdeRoleTableService {
  constructor(
    @InjectModel(AdeRoleTable)
    private ade_role_table: typeof AdeRoleTable,
    private helpers: HelpersService,
  ) {}
  async create(createAdeRoleTableDto: CreateAdeRoleTableDto, payload: any) {
    const response = await this.ade_role_table.create({
      ...createAdeRoleTableDto,
      created_by: payload.sub,
    });
    return 'data added!';
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` } }
      : {};
    const { limit, offset } = this.helpers.getPagination(page, size);
    const data = await this.ade_role_table.findAndCountAll({
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
          model: AdeTables,
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
      'ade_role_table',
    );
    return response || {};
  }

  async findOne(id: number) {
    const response = await this.ade_role_table.findOne({
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
        // is_active: 1,
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
          model: AdeTables,
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
    updateAdeRoleTableDto: UpdateAdeRoleTableDto,
    payload: any,
  ) {
    const response = await this.ade_role_table.update(
      {
        ...updateAdeRoleTableDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number) {
    const response = await this.ade_role_table.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
