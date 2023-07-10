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
import { AdeMastersService } from './ade_masters.service';
import { CreateAdeMastersDto } from './dto/create-ade_masters.dto';
import { UpdateAdeMastersDto } from './dto/update-ade_masters.dto';

@Controller('ade_masters')
export class AdeMastersController {
  constructor(private readonly adeMastersService: AdeMastersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdeMastersDto: CreateAdeMastersDto, @Request() req) {
    return this.adeMastersService.create(createAdeMastersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { slug_name, slug_type, page, size, field, search } = req.query;
    if (slug_name && slug_type) {
      return await this.adeMastersService.findBySlug(
        slug_name,
        slug_type,
        req.user,
      );
    }
    console.log('shawon');
    return await this.adeMastersService.findAll(
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
    //console.log('shawon');
    return this.adeMastersService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeMastersDto: UpdateAdeMastersDto,
    @Request() req,
  ) {
    return this.adeMastersService.update(+id, updateAdeMastersDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeMastersService.remove(+id, req.user);
  }
}
