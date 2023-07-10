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
import { AdeRoleTableService } from './ade_role_table.service';
import { CreateAdeRoleTableDto } from './dto/create-ade_role_table.dto';
import { UpdateAdeRoleTableDto } from './dto/update-ade_role_table.dto';

@Controller('ade_role_table')
export class AdeRoleTableController {
  constructor(private readonly adeRoleTableService: AdeRoleTableService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeRoleTableDto: CreateAdeRoleTableDto, @Request() req) {
    return this.adeRoleTableService.create(createAdeRoleTableDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeRoleTableService.findAll(page, size, field, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adeRoleTableService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeRoleTableDto: UpdateAdeRoleTableDto,
    @Request() req,
  ) {
    return this.adeRoleTableService.update(
      +id,
      updateAdeRoleTableDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adeRoleTableService.remove(+id);
  }
}
