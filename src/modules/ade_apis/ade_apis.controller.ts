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
import { AdeApisService } from './ade_apis.service';
import { CreateAdeApisDto } from './dto/create-ade_apis.dto';
import { UpdateAdeApisDto } from './dto/update-ade_apis.dto';

@Controller('ade_apis')
export class AdeApisController {
  constructor(private readonly adeApisService: AdeApisService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeApisDto: CreateAdeApisDto, @Request() req) {
    return this.adeApisService.create(createAdeApisDto, req.user);
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

    return await this.adeApisService.findAll(
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
    return this.adeApisService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeApisDto: UpdateAdeApisDto,
    @Request() req,
  ) {
    return this.adeApisService.update(+id, updateAdeApisDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeApisService.remove(+id, req.user);
  }
}
