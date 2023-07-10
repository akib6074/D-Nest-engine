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
import { AdeTablesService } from './ade_tables.service';
import { CreateAdeTablesDto } from './dto/create-ade_tables.dto';
import { UpdateAdeTablesDto } from './dto/update-ade_tables.dto';

@Controller('ade_tables')
export class AdeTablesController {
  constructor(private readonly adeTablesService: AdeTablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeTablesDto: CreateAdeTablesDto, @Request() req) {
    return this.adeTablesService.create(createAdeTablesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeTablesService.findAll(
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
    return this.adeTablesService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeTablesDto: UpdateAdeTablesDto,
    @Request() req,
  ) {
    return this.adeTablesService.update(+id, updateAdeTablesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeTablesService.remove(+id, req.user);
  }
}
