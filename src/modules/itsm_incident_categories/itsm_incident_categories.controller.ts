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
import { ItsmIncidentCategoriesService } from './itsm_incident_categories.service';
import { CreateItsmIncidentCategoriesDto } from './dto/create-itsm_incident_categories.dto';
import { UpdateItsmIncidentCategoriesDto } from './dto/update-itsm_incident_categories.dto';

@Controller('itsm_incident_categories')
export class ItsmIncidentCategoriesController {
  constructor(private readonly itsmIncidentCategoriesService: ItsmIncidentCategoriesService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmIncidentCategoriesDto: CreateItsmIncidentCategoriesDto, @Request() req) {
return await this.itsmIncidentCategoriesService.create(createItsmIncidentCategoriesDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmIncidentCategoriesService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmIncidentCategoriesService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmIncidentCategoriesDto: UpdateItsmIncidentCategoriesDto, @Request() req) {
  return await this.itsmIncidentCategoriesService.update(+id, updateItsmIncidentCategoriesDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmIncidentCategoriesService.remove(+id, req.user);
}

}
