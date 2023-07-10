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
import { AdeModulesService } from './ade_modules.service';
import { CreateAdeModulesDto } from './dto/create-ade_modules.dto';
import { UpdateAdeModulesDto } from './dto/update-ade_modules.dto';

@Controller('ade_modules')
export class AdeModulesController {
  constructor(private readonly adeModulesService: AdeModulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeModulesDto: CreateAdeModulesDto, @Request() req) {
    return this.adeModulesService.create(createAdeModulesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() params: any, @Request() req) {
    const { page, size, field, search } = req.query;
    const { all } = params;
    return await this.adeModulesService.findAll(
      all,
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
    return this.adeModulesService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeModulesDto: UpdateAdeModulesDto,
    @Request() req,
  ) {
    return this.adeModulesService.update(+id, updateAdeModulesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeModulesService.remove(+id, req.user);
  }
}
