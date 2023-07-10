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
import { ItsmAttachmentsService } from './itsm_attachments.service';
import { CreateItsmAttachmentsDto } from './dto/create-itsm_attachments.dto';
import { UpdateItsmAttachmentsDto } from './dto/update-itsm_attachments.dto';

@Controller('itsm-attachments')
export class ItsmAttachmentsController {
  constructor(private readonly itsmAttachmentsService: ItsmAttachmentsService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmAttachmentsDto: CreateItsmAttachmentsDto, @Request() req) {
return await this.itsmAttachmentsService.create(createItsmAttachmentsDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmAttachmentsService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmAttachmentsService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmAttachmentsDto: UpdateItsmAttachmentsDto, @Request() req) {
  return await this.itsmAttachmentsService.update(+id, updateItsmAttachmentsDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmAttachmentsService.remove(+id, req.user);
}

}
