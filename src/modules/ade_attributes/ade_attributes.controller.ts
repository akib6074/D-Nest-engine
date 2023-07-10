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
import { AdeAttributesService } from './ade_attributes.service';
import { CreateAdeAttributesDto } from './dto/create-ade_attributes.dto';
import { UpdateAdeAttributesDto } from './dto/update-ade_attributes.dto';

@Controller('ade_attributes')
export class AdeAttributesController {
  constructor(private readonly adeAttributesService: AdeAttributesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAdeAttributesDto: CreateAdeAttributesDto,
    @Request() req,
  ) {
    return this.adeAttributesService.create(createAdeAttributesDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeAttributesService.findAll(page, size, field, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adeAttributesService.findTableAttributes(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeAttributesDto: UpdateAdeAttributesDto,
    @Request() req,
  ) {
    return this.adeAttributesService.update(
      +id,
      updateAdeAttributesDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adeAttributesService.remove(+id);
  }
}
