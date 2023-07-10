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
import { ItsmIncidentSubCategoriesService } from './itsm_incident_sub_categories.service';
import { CreateItsmIncidentSubCategoriesDto } from './dto/create-itsm_incident_sub_categories.dto';
import { UpdateItsmIncidentSubCategoriesDto } from './dto/update-itsm_incident_sub_categories.dto';

@Controller('itsm_incident_sub_categories')
export class ItsmIncidentSubCategoriesController {
  constructor(private readonly itsmIncidentSubCategoriesService: ItsmIncidentSubCategoriesService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmIncidentSubCategoriesDto: CreateItsmIncidentSubCategoriesDto, @Request() req) {
return await this.itsmIncidentSubCategoriesService.create(createItsmIncidentSubCategoriesDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmIncidentSubCategoriesService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmIncidentSubCategoriesService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmIncidentSubCategoriesDto: UpdateItsmIncidentSubCategoriesDto, @Request() req) {
  return await this.itsmIncidentSubCategoriesService.update(+id, updateItsmIncidentSubCategoriesDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmIncidentSubCategoriesService.remove(+id, req.user);
}

}
