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
} from '@nestjs/common';
import { JwtAuthGuard } from '../ade-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeRoleApiService } from './ade_role_api.service';
import { CreateAdeRoleApiDto } from './dto/create-ade_role_api.dto';
import { UpdateAdeRoleApiDto } from './dto/update-ade_role_api.dto';

@Controller('ade_role_api')
export class AdeRoleApiController {
  constructor(private readonly adeRoleApiService: AdeRoleApiService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeRoleApiDto: CreateAdeRoleApiDto, @Request() req) {
    return this.adeRoleApiService.create(createAdeRoleApiDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
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

    return await this.adeRoleApiService.findAll(
      attributes,
      includes,
      iattributes,
      isDropDown,
      page,
      size,
      field,
      search,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.adeRoleApiService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeRoleApiDto: UpdateAdeRoleApiDto,
    @Request() req,
  ) {
    return this.adeRoleApiService.update(+id, updateAdeRoleApiDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeRoleApiService.remove(+id, req.user);
  }
}
