/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AdeUsersService } from 'src/modules/ade_users/ade_users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdeUsers } from '../ade_users/ade_users.model';
import { CreateAdeUsersDto } from '../ade_users/dto/create-ade_users.dto';
import { AdeRoleModuleService } from '../ade_role_module/ade_role_module.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdeUsersService,
    private roleModuleService: AdeRoleModuleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // console.log(user.get({ plain: true }));
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    // const { password, ...result } = user['dataValues'];
    const { password, ...result } = user.get({ plain: true });
    //console.log(result);
    return result;
  }

  async login(user: any) {
    const modules = await this.roleModuleService.findByRole(user.role_id);
    const payload = {
      user_ss_id: user.id,
      name: user.user_name,
      email: user.email,
      sub: user.id,
      role: user.role_id,
      role_name: user.AdeRole.role_name,
      modules: modules,
      language: 'English',
    };
    return {
      ...payload,
      access_token: this.jwtService.sign(payload)
    };
  }

  // public async create(user: CreateAdeUsersDto) {
  //   // console.log(user);
  //   // hash the password
  //   const pass = await this.hashPassword(user.password);

  //   // create the user
  //   const newUser = await this.usersService.create({ ...user, password: pass });

  //   // tslint:disable-next-line: no-string-literal
  //   const { password, ...result } = newUser['dataValues'];

  //   // generate token
  //   const token = await this.generateToken(result);

  //   // return the user and the token
  //   return { user: result, token };
  // }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    // console.log(hash);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
