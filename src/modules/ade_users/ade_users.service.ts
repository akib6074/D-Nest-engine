/* eslint-disable prettier/prettier */
import { AdeUserModule } from '../ade_user_module/ade_user_module.model';

import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeUsers } from './ade_users.model';
import { CreateAdeUsersDto } from './dto/create-ade_users.dto';
import { UpdateAdeUsersDto } from './dto/update-ade_users.dto';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
@Injectable()
export class AdeUsersService {
  constructor(
    @InjectModel(AdeUsers)
    private ade_users: typeof AdeUsers,
    private helpers: HelpersService,
  ) {}
  // async create(createAdeUsersDto: CreateAdeUsersDto): Promise<AdeUsers> {
  //   const response = await this.ade_users.create({
  //     ...createAdeUsersDto,
  //   });
  //   // return {
  //   //   error: false,
  //   //   statusCode: 201,
  //   //   message: 'record created successfully!',
  //   //   data: response,
  //   // };
  //   return response;
  // }
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    // console.log(hash);
    return hash;
  }

  public async create(user: CreateAdeUsersDto, assets: any) {
    try {
      const pass = await this.hashPassword(user.password);
      let newUser;

      if (assets?.length > 0) {
        const file_name = assets[0].filename;
        const photo = process.env.BASE_URL + 'images/users/' + file_name;
        newUser = await this.ade_users.create({
          ...user,
          password: pass,
          photo: photo,
        });
      } else {
        newUser = await this.ade_users.create({ ...user, password: pass });
      }

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(
    attributes: string,
    includes: string,
    iattributes: string,
    isDropDown,
    page: number,
    size: number,
    field: string,
    search: string,
  ) {
    // const onlyFieldName=field.split('_').slice(1).join();
    // console
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` }, is_active: 1 }
      : { is_active: 1 };
    const { limit, offset } = this.helpers.getPagination(page, size);
    const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;
    const data = await this.ade_users.findAndCountAll({
      order: [['id', 'DESC']],
      attributes: attributes
        ? JSON.parse(attributes)
        : ['id', 'user_name', 'email'],
      include: [
        {
          model: AdeRoles,
          attributes: attributesInclude
            ? attributesInclude[
                modelIncludes.indexOf(this.helpers.toSnakeCase('AdeRoles'))
              ]
            : ['role_name'],
        },
      ],
      where: condition,
      limit,
      offset,
    });

    const count = data.count;
    const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }), 'ade_users'),
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
      'ade_users',
    );
    //const response = this.helpers.getPagingData(data, page, limit, 'ade_users');
    return response || {};
  }

  async findOne(id: number) {
    const response = await this.ade_users.findOne({
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
      where: {
        id,
        is_active: 1,
      },
      include: [
        // { model: AdeUserModule },
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
      ],
    });

    return response || {};
  }

  async findOneByEmail(email: string): Promise<AdeUsers> {
    const response = await this.ade_users.findOne({
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
        email,
        is_active: 1,
      },
      include: [
        {
          model: AdeRoles,
          attributes: {
            exclude: [
              'id',
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
    //console.log(response);
    return response || ({} as AdeUsers);
  }

  async update(
    id: number,
    updateAdeUsersDto: UpdateAdeUsersDto,
    payload: any,
    assets: any,
  ) {
    // const response = await this.ade_users.update(
    //   {
    //     ...updateAdeUsersDto,
    //     updated_at: sequelize.fn('NOW'),
    //     updated_by: payload.sub,
    //   },
    //   { where: { id }, returning: true },
    // );

    // return 'data updated!';
    try {
      //const pass = await this.hashPassword('123456');
      let newUser;

      if (assets.length > 0) {
        const file_name = assets[0].filename;
        const photo = process.env.BASE_URL + 'images/users/' + file_name;
        newUser = await this.ade_users.update(
          { ...updateAdeUsersDto, photo: photo },
          { where: { id }, returning: true },
        );
      } else {
        newUser = await this.ade_users.update(
          { ...updateAdeUsersDto },
          { where: { id }, returning: true },
        );
      }

      return 'data updated!';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    //   const response = await this.ade_users.update(
    //     {
    //       is_active: 0,
    //       deleted_at: sequelize.fn('NOW'),
    //     },
    //     { where: { id } },
    //   );

    //   return 'data removed!';
    const response = await this.ade_users.update(
      {
        is_active: 0,
        deleted_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
      { where: { id } },
    );
    return [];
  }

  async resetPassword(id, resetPassword): Promise<any> {
    try {
      //let a:string='type'
      const employee_id: AdeUsers = await await AdeUsers.findByPk(id);
      const hash = employee_id.password;
      const current_password = resetPassword.current_password;
      const new_password_match = resetPassword.new_password;
      const new_password = await this.hashPassword(resetPassword.new_password);

      const isMatch = await bcrypt.compare(current_password, hash);
      const NewPassMtch = await bcrypt.compare(new_password_match, hash);
      //console.log(NewPassMtch);

      if (current_password && new_password_match) {
        if (isMatch == false) {
          return ['Current Password Does Not Match ! Try Again'];
        } else if (NewPassMtch == true) {
          return ['Provided Password Same With Previous One! Try Another'];
        } else if (NewPassMtch == false && isMatch == true) {
          const updatePassword = {
            password: new_password,
          };
          await this.ade_users.update(
            { ...updatePassword },
            { where: { id }, returning: true },
          );
          return ['Password Successfully Changed'];
          //return [];
        }
      } else {
        return ['Field Must Not Be Empty'];
      }
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async langChangeByUser(data: any) {
    const id = data.user_id;
    const language_name = data.language_name;
    const employee_id: AdeUsers = await await AdeUsers.findByPk(id);

    const updateInfo = {
      language: language_name,
    };
    try {
      if (employee_id) {
        await this.ade_users.update(
          { ...updateInfo },
          { where: { id }, returning: true },
        );
      } else {
        return ['User not exist! try with currect user'];
      }
      return ['Language changed successfully'];
    } catch (error) {}
  }
}
