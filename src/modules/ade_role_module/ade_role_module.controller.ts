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
import { AdeRoleModuleService } from './ade_role_module.service';
import { CreateAdeRoleModuleDto } from './dto/create-ade_role_module.dto';
import { UpdateAdeRoleModuleDto } from './dto/update-ade_role_module.dto';

@Controller('ade_role_module')
export class AdeRoleModuleController {
  constructor(private readonly adeRoleModuleService: AdeRoleModuleService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAdeRoleModuleDto: CreateAdeRoleModuleDto,
    @Request() req,
  ) {
    return this.adeRoleModuleService.create(createAdeRoleModuleDto, req.user);
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

    return await this.adeRoleModuleService.findAll(
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

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.adeRoleModuleService.findOne(+id, req.user);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeRoleModuleDto: UpdateAdeRoleModuleDto,
    @Request() req,
  ) {
    return this.adeRoleModuleService.update(
      +id,
      updateAdeRoleModuleDto,
      req.user,
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeRoleModuleService.remove(+id, req.user);
  }
}
