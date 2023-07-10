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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../ade-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AdeMenuPriviledgeService } from './ade_menu_priviledge.service';
import { CreateAdeMenuPriviledgeDto } from './dto/create-ade_menu_priviledge.dto';
import { UpdateAdeMenuPriviledgeDto } from './dto/update-ade_menu_priviledge.dto';

@Controller('ade_menu_priviledge')
export class AdeMenuPriviledgeController {
  constructor(
    private readonly adeMenuPriviledgeService: AdeMenuPriviledgeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAdeMenuPriviledgeDto: CreateAdeMenuPriviledgeDto[],
    @Request() req,
  ) {
    return this.adeMenuPriviledgeService.create(
      createAdeMenuPriviledgeDto,
      req.user,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('menus')
  findMenusByRoleModule(@Query() params: any, @Request() req) {
    const { role_id, module_id, active } = params;
    //console.log(role_id, module_id, active);
    //return params;
    return this.adeMenuPriviledgeService.findMenusByRoleModule(
      role_id,
      module_id,
      active,
      req.user,
    );
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

    return await this.adeMenuPriviledgeService.findAll(
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
  findOne(@Param('id') id: string, @Query() params: any, @Request() req) {
    // if (params.role_id) return false;
    return this.adeMenuPriviledgeService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeMenuPriviledgeDto: UpdateAdeMenuPriviledgeDto,
    @Request() req,
  ) {
    return this.adeMenuPriviledgeService.update(
      +id,
      updateAdeMenuPriviledgeDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeMenuPriviledgeService.remove(+id, req.user);
  }
}
