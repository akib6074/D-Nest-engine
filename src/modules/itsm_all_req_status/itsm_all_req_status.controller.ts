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
import { ItsmAllReqStatusService } from './itsm_all_req_status.service';
import { CreateItsmAllReqStatusDto } from './dto/create-itsm_all_req_status.dto';
import { UpdateItsmAllReqStatusDto } from './dto/update-itsm_all_req_status.dto';

@Controller('itsm_all_req_status')
export class ItsmAllReqStatusController {
  constructor(private readonly itsmAllReqStatusService: ItsmAllReqStatusService) {}
 
@Post()
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmAllReqStatusDto: CreateItsmAllReqStatusDto, @Request() req) {
return await this.itsmAllReqStatusService.create(createItsmAllReqStatusDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmAllReqStatusService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmAllReqStatusService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmAllReqStatusDto: UpdateItsmAllReqStatusDto, @Request() req) {
  return await this.itsmAllReqStatusService.update(+id, updateItsmAllReqStatusDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmAllReqStatusService.remove(+id, req.user);
}

}
