/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeAttributes } from './ade_attributes.model';
import { CreateAdeAttributesDto } from './dto/create-ade_attributes.dto';
import { UpdateAdeAttributesDto } from './dto/update-ade_attributes.dto';
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
@Injectable()
export class AdeAttributesService {
  constructor(
    @InjectModel(AdeAttributes)
    private ade_attributes: typeof AdeAttributes,
    @InjectModel(AdeTables) private ade_tables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeAttributesDto: CreateAdeAttributesDto, payload: any) {
    try {
      const response = await this.ade_attributes.create({
        ...createAdeAttributesDto,
        created_at: sequelize.fn('NOW'),
        created_by: payload.sub,
      });
      return {
        error: false,
        statusCode: 201,
        message: 'record created successfully!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(page: number, size: number, field: string, search: string) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` } }
      : {};
    const { limit, offset } = this.helpers.getPagination(page, size);
    try {
      const data = await this.ade_attributes.findAndCountAll({
        order: [['id', 'DESC']],
        include: [{ model: AdeTables }],
        where: condition,
        limit,
        offset,
      });
      const response = this.helpers.getPagingData(
        data,
        page,
        limit,
        'ade_attributes',
      );
      return {
        error: false,
        statusCode: 200,
        message: 'Success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const response = await this.ade_attributes.findOne({
        where: {
          id,
          // is_active: 1,
        },
        include: [{ model: AdeTables }],
      });
      return {
        error: false,
        statusCode: 200,
        message: 'Success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findTableAttributes(id: number) {
    const allAttributes = await this.ade_attributes.findAll({
      where: {
        ade_table_id: id,
        is_active: 1,
      },
      attributes: [
        'attribute_name',
        'attribute_type',
        'foreignKey',
        'foreign_table_id',
      ],
    });
    const foreignTableAttributes = [];
    const foreignTableIds = allAttributes
      .map((m) => m.get({ plain: true }))
      .filter((field) => field.foreign_table_id !== null);
    // console.log(foreignTableIds);
    for (let i = 0; i < foreignTableIds.length; i++) {
      const tableF = await this.ade_tables.findOne({
        where: {
          id: foreignTableIds[i].foreign_table_id,
          //is_active: 1,
        },
        attributes: ['id', 'table_name'],
      });
      const tableFAttributes = await this.ade_attributes.findAll({
        where: {
          ade_table_id: tableF.id,
          is_active: 1,
        },
        attributes: {
          exclude: [
            'id',
            'primaryKey',
            'foreignKey',
            'foreign_table_id',
            'ade_table_id',
            'is_active',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by',
            'deleted_at',
          ],
        },
      });
      foreignTableAttributes.push({
        table_name: tableF.table_name,
        attributes: tableFAttributes,
      });
    }

    return {
      thisTable: allAttributes
        .map((m) => m.get({ plain: true }))
        .map((m) =>
          Object.keys(m)
            // .filter((key) => key !== 'foreign_table_id')
            .reduce((obj, key) => {
              obj[key] = m[key];
              return obj;
            }, {}),
        ),
      foreignTables: foreignTableAttributes,
    };
  }

  async update(
    id: number,
    updateAdeAttributesDto: UpdateAdeAttributesDto,
    payload: any,
  ) {
    try {
      const response = await this.ade_attributes.update(
        {
          ...updateAdeAttributesDto,
          updated_at: sequelize.fn('NOW'),
          updated_by: payload.sub,
        },
        { where: { id }, returning: true },
      );

      return {
        error: false,
        statusCode: 200,
        message: 'Update success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const response = await this.ade_attributes.update(
        {
          is_active: 0,
          deleted_at: sequelize.fn('NOW'),
        },
        { where: { id } },
      );
      return {
        error: false,
        statusCode: 200,
        message: 'Delete success!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        {
          error: true,
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.errors[0].message,
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
