/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoleModule } from './ade_role_module.model';
import { CreateAdeRoleModuleDto } from './dto/create-ade_role_module.dto';
import { UpdateAdeRoleModuleDto } from './dto/update-ade_role_module.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';
@Injectable()
export class AdeRoleModuleService {
  constructor(
    @InjectModel(AdeRoleModule)
    private ade_role_module: typeof AdeRoleModule,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    private helpers: HelpersService,
  ) {}
  async create(createAdeRoleModuleDto: CreateAdeRoleModuleDto, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_module' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canCreate = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Create',
    //     //is_active:true,
    //   },
    // });
    // if (!canCreate) throw new UnauthorizedException();
    const response = await this.ade_role_module.create({
      ...createAdeRoleModuleDto,
      created_by: payload.sub,
    });
    return 'one ade_role_module added!';
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
    const thisTableInfo = await this.adeTables.findOne({
      where: { table_name: 'ade_role_module' },
    });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canRead = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Read',
    //   },
    // });
    // if (!canRead) throw new UnauthorizedException();
    const data = await this.ade_role_module.findAndCountAll({
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
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_role_module'),
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
      'ade_role_module',
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_module' },
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
    const response = await this.ade_role_module.findOne({
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
        { model: AdeRoles, attributes:['id','role_name'] },
        { model: AdeModules, attributes:['id','module_name','module_url'] },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateAdeRoleModuleDto: UpdateAdeRoleModuleDto,
    payload: any,
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_module' },
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
    const response = await this.ade_role_module.update(
      {
        ...updateAdeRoleModuleDto,
        //updated_at: sequelize.fn('NOW'),
        updated_by: payload.sub,
      },
      { where: { id }, returning: true },
    );

    return 'ade_role_module updated!';
  }

  async remove(id: number, payload: any) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'ade_role_module' },
    // });
    // if (!thisTableInfo) throw new ForbiddenException();
    // const canDelete = await this.role_table.findOne({
    //   where: {
    //     role_id: payload.role,
    //     table_id: thisTableInfo.id,
    //     access_type: 'All' || 'Delete',
    //     //is_active:true,
    //   },
    // });
    // if (!canDelete) throw new UnauthorizedException();
    const response = await this.ade_role_module.destroy(
      // {
      //     is_active: 0,
      //     deleted_at: sequelize.fn('NOW'),
      //   },
      { where: { id } },
    );
    return 'one record deleted from ade_role_module!';
  }

  async findByRole(id: number) {
    const response = await this.ade_role_module.findAll({
      where: {
        ade_roles_id: id,
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
          'accesible',
          'ade_roles_id',
          'ade_modules_id',
          'id'
        ],
      },
      include: 
        { model: AdeModules, attributes:['id','module_name','module_url'] },
    });
    return response.map((data)=>data.AdeModules) || {};
  }
}
