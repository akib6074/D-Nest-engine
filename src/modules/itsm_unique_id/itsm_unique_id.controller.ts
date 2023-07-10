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
import { ItsmUniqueIdService } from './itsm_unique_id.service';
import { CreateItsmUniqueIdDto } from './dto/create-itsm_unique_id.dto';
import { UpdateItsmUniqueIdDto } from './dto/update-itsm_unique_id.dto';

@Controller('itsm_unique_id')
export class ItsmUniqueIdController {
  constructor(private readonly itsmUniqueIdService: ItsmUniqueIdService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmUniqueIdDto: CreateItsmUniqueIdDto, @Request() req) {
return await this.itsmUniqueIdService.create(createItsmUniqueIdDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmUniqueIdService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmUniqueIdService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmUniqueIdDto: UpdateItsmUniqueIdDto, @Request() req) {
  return await this.itsmUniqueIdService.update(+id, updateItsmUniqueIdDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmUniqueIdService.remove(+id, req.user);
}

}
