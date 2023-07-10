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
import { AdeRolesService } from './ade_roles.service';
import { CreateAdeRolesDto } from './dto/create-ade_roles.dto';
import { UpdateAdeRolesDto } from './dto/update-ade_roles.dto';

@Controller('ade_roles')
export class AdeRolesController {
  constructor(private readonly adeRolesService: AdeRolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeRolesDto: CreateAdeRolesDto, @Request() req) {
    return this.adeRolesService.create(createAdeRolesDto, req.user);
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

    return await this.adeRolesService.findAll(
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

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.adeRolesService.findOne(+id, req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeRolesDto: UpdateAdeRolesDto,
    @Request() req,
  ) {
    return this.adeRolesService.update(+id, updateAdeRolesDto, req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeRolesService.remove(+id, req.user);
  }
}
