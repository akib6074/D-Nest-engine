/* eslint-disable prettier/prettier */
import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';

import { AdeAttributes } from 'src/modules/ade_attributes/ade_attributes.model';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeTables } from './ade_tables.model';
import { CreateAdeTablesDto } from './dto/create-ade_tables.dto';
import { UpdateAdeTablesDto } from './dto/update-ade_tables.dto';
@Injectable()
export class AdeTablesService {
  constructor(
    @InjectModel(AdeTables)
    private ade_tables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeTablesDto: CreateAdeTablesDto, payload: any) {
    const response = await this.ade_tables.create({
      ...createAdeTablesDto,
      created_by: payload.sub,
    });
    return response || {};
  }

  async findAll(
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

    const data = await this.ade_tables.findAndCountAll({
      order: [['id', 'DESC']],
      where: condition,
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
      limit,
      offset,
    });
    const response = this.helpers.getPagingData(
      data,
      page,
      limit,
      'ade_tables',
    );
    console.log(
      await this.ade_tables.sequelize.showAllSchemas({ logging: true }),
    );
    console.log(
      await this.ade_tables.sequelize
        .getQueryInterface()
        .describeTable('ade_role_table', { logging: true }),
    );
    console.log(
      await this.ade_tables.sequelize
        .getQueryInterface()
        .getForeignKeyReferencesForTable('ade_role_table', { logging: true }),
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    const response = await this.ade_tables.findOne({
      where: {
        id,
        //  is_active: 1,
      },
      include: [
        //{ model: AdeRoleTable },
        {
          model: AdeAttributes,
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
    updateAdeTablesDto: UpdateAdeTablesDto,
    payload: any,
  ) {
    const response = await this.ade_tables.update(
      {
        ...updateAdeTablesDto,
        updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'data updated!';
  }

  async remove(id: number, payload: any) {
    const response = await this.ade_tables.update(
      {
        is_active: 0,
        deleted_at: sequelize.fn('NOW'),
      },
      { where: { id } },
    );
    return 'data removed!';
  }
}
