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
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ItsmIssuesService } from './itsm_issues.service';
import { CreateItsmIssuesDto } from './dto/create-itsm_issues.dto';
import { UpdateItsmIssuesDto } from './dto/update-itsm_issues.dto';
import { fileFilter, storageforRunnerRequired } from '../common-services/file-storage.util';
import { FilesToBodyInterceptor } from '../common-services/files-to-body.interceptor';

@Controller('itsm-issues')
export class ItsmIssuesController {
  constructor(private readonly itsmIssuesService: ItsmIssuesService) {}
 
@Post()
@UseInterceptors(
  FilesInterceptor("files", 1000, {
    storage: storageforRunnerRequired,
    fileFilter: fileFilter,
  }),
  FilesToBodyInterceptor
)
@UseGuards(JwtAuthGuard)
 async create(@Body() createItsmIssuesDto: CreateItsmIssuesDto, @Request() req) {
return await this.itsmIssuesService.create(createItsmIssuesDto, req.user,[]);
}
@UseGuards(JwtAuthGuard)
@Get()
async findAll(@Request() req) {
  const { attributes,includes,iattributes, isDropDown,page, size, field, search } = req.query;

  return await this.itsmIssuesService.findAll(attributes, includes, iattributes, isDropDown, page, size, field, search,req.user);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req) {
  return this.itsmIssuesService.findOne(+id, req.user);
}
@UseGuards(JwtAuthGuard)
@Patch(':id')
async update(@Param('id') id: string,@Body() updateItsmIssuesDto: UpdateItsmIssuesDto, @Request() req) {
  return await this.itsmIssuesService.update(+id, updateItsmIssuesDto, req.user,[]);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req) {
  return this.itsmIssuesService.remove(+id, req.user);
}

}
