/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/ade-auth/local-auth.guard';
import { AuthService } from './modules/ade-auth/ade-auth.service';
import { JwtAuthGuard } from './modules/ade-auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req, @Body() body) {
  //   return this.authService.login(req.user, body);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('table')
  // async getTable() {
  //   await Table1.sync({ alter: true });
  //   return 'done';
  // }
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
