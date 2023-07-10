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
import { AdeRoleMenuService } from './ade_role_menu.service';
import { CreateAdeRoleMenuDto } from './dto/create-ade_role_menu.dto';
import { UpdateAdeRoleMenuDto } from './dto/update-ade_role_menu.dto';
import { BulkCreateAdeRoleMenuDto } from './dto/bulk-create-ade_role_menu.dto';

@Controller('ade_role_menu')
export class AdeRoleMenuController {
  constructor(private readonly adeRoleMenuService: AdeRoleMenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeRoleMenuDto: CreateAdeRoleMenuDto, @Request() req) {
    return this.adeRoleMenuService.create(createAdeRoleMenuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeRoleMenuService.findAll(
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
    return this.adeRoleMenuService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeRoleMenuDto: UpdateAdeRoleMenuDto,
    @Request() req,
  ) {
    return this.adeRoleMenuService.update(+id, updateAdeRoleMenuDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async bulkUpdate(
    @Body() bulkCreateAdeRoleMenuDto: BulkCreateAdeRoleMenuDto,
    @Request() req,
  ) {
    // console.log(bulkCreateAdeRoleMenuDto);
    return await this.adeRoleMenuService.bulkUpdate(
      bulkCreateAdeRoleMenuDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeRoleMenuService.remove(+id, req.user);
  }
}
