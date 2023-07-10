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
import { AdeMenusService } from './ade_menus.service';
import { CreateAdeMenusDto } from './dto/create-ade_menus.dto';
import { UpdateAdeMenusDto } from './dto/update-ade_menus.dto';
import { SingleUpdateAdeMenusDto } from './dto/bulk-update-ade_menus.dto';

@Controller('ade_menus')
export class AdeMenusController {
  constructor(private readonly adeMenusService: AdeMenusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeMenusDto: CreateAdeMenusDto, @Request() req) {
    if (createAdeMenusDto.createMaster) {
      return this.adeMenusService.createMasterDataMenu(
        createAdeMenusDto,
        req.user,
      );
    }
    return this.adeMenusService.create(createAdeMenusDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeMenusService.findAll(
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
    return this.adeMenusService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':mid/:pid')
  findByModuleAndParentId(
    @Param('mid') mid: string,
    @Param('pid') pid: string,
    @Request() req,
  ) {
    //console.log(mid, pid, '***');
    return this.adeMenusService.findByModuleAndParentId(+mid, +pid, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeMenusDto: UpdateAdeMenusDto,
    @Request() req,
  ) {
    return this.adeMenusService.update(+id, updateAdeMenusDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  bulkUpdate(
    @Body() updateAdeMenusDto: SingleUpdateAdeMenusDto[],
    @Request() req,
  ) {
    return this.adeMenusService.bulkUpdate(updateAdeMenusDto, req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeMenusService.remove(+id, req.user);
  }
}
