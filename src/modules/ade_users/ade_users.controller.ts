/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from '../ade-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeUsersService } from './ade_users.service';
import { CreateAdeUsersDto } from './dto/create-ade_users.dto';
import { UpdateAdeUsersDto } from './dto/update-ade_users.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ResetPasswordDto } from './dto/create-ade_reset_pass.dto';
import { UpdateLanguage } from './dto/update-language.dto';

@Controller('ade_users')
export class AdeUsersController {
  constructor(private readonly adeUsersService: AdeUsersService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/users/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async createWithFiles(
    @UploadedFiles() assets,
    @Body() user: CreateAdeUsersDto,
  ) {
    return await this.adeUsersService.create(user, assets);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const {
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
    } = req.query;

    return await this.adeUsersService.findAll(
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adeUsersService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdeUsersDto: UpdateAdeUsersDto,
  //   @Request() req,
  // ) {
  //   return this.adeUsersService.update(+id, updateAdeUsersDto, req.user);
  // }

  @Patch('profileUpdate/:id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/users/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateWithFiles(
    @Param('id') id: string,
    @Request() req,
    @UploadedFiles() assets,
    @Body() updateAdeUsersDto: UpdateAdeUsersDto,
  ) {
    return await this.adeUsersService.update(
      +id,
      updateAdeUsersDto,
      req.user,
      assets,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adeUsersService.remove(+id);
  }

  @Post('passwordReset/:id')
  async resetPassword(
    @Param('id') user_id: string,
    @Body() resetPassword: ResetPasswordDto,
  ) {
    return this.adeUsersService.resetPassword(user_id, resetPassword);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch('langChangeByUser')
  async langChangeByUser(@Body() updateLanguage: UpdateLanguage) {
    return this.adeUsersService.langChangeByUser(updateLanguage);
  }
}
