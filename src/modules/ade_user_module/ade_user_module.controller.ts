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
import { AdeUserModuleService } from './ade_user_module.service';
import { CreateAdeUserModuleDto } from './dto/create-ade_user_module.dto';
import { UpdateAdeUserModuleDto } from './dto/update-ade_user_module.dto';

@Controller('ade_user_module')
export class AdeUserModuleController {
  constructor(private readonly adeUserModuleService: AdeUserModuleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAdeUserModuleDto: CreateAdeUserModuleDto,
    @Request() req,
  ) {
    return this.adeUserModuleService.create(createAdeUserModuleDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { page, size, field, search } = req.query;

    return await this.adeUserModuleService.findAll(
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
    return this.adeUserModuleService.findOne(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdeUserModuleDto: UpdateAdeUserModuleDto,
    @Request() req,
  ) {
    return this.adeUserModuleService.update(
      +id,
      updateAdeUserModuleDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adeUserModuleService.remove(+id, req.user);
  }
}
