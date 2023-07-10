/* eslint-disable prettier/prettier */
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './ade-auth.service';
import { CreateAdeUsersDto } from 'src/modules/ade_users/dto/create-ade_users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() body) {
    return await this.authService.login(req.user);
  }

  // @Post('signup')
  // async signUp(@Body() user: CreateAdeUsersDto) {
  //   // console.log(user);
  //   return await this.authService.create(user);
  // }
}
