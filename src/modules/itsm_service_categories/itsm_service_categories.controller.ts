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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from '../ade-auth/jwt-auth.guard';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ItsmServiceCategoriesService } from './itsm_service_categories.service';
import { CreateItsmServiceCategoriesDto } from './dto/create-itsm_service_categories.dto';
import { UpdateItsmServiceCategoriesDto } from './dto/update-itsm_service_categories.dto';

@Controller('itsm-service-categories')
export class ItsmServiceCategoriesController {
  constructor(private readonly itsmServiceCategoriesService: ItsmServiceCategoriesService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmServiceCategoriesDto: CreateItsmServiceCategoriesDto, @Request() req) {
return await this.itsmServiceCategoriesService.create(createItsmServiceCategoriesDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmServiceCategoriesService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmServiceCategoriesService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmServiceCategoriesDto: UpdateItsmServiceCategoriesDto, @Request() req) {
  return await this.itsmServiceCategoriesService.update(+id, updateItsmServiceCategoriesDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmServiceCategoriesService.remove(+id, req.user);
}

}
