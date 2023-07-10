/* eslint-disable prettier/prettier */
import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { ItsmAllReqStatus } from './itsm_all_req_status.model';
import { CreateItsmAllReqStatusDto } from './dto/create-itsm_all_req_status.dto';
import { UpdateItsmAllReqStatusDto } from './dto/update-itsm_all_req_status.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import * as moment from "moment";
@Injectable()
      export class ItsmAllReqStatusService {
        constructor(
          @InjectModel(ItsmAllReqStatus)
          private itsm_all_req_status: typeof ItsmAllReqStatus,
          @InjectModel(AdeRoleTable) 
          private role_table: typeof AdeRoleTable,
          @InjectModel(AdeTables) 
          private adeTables: typeof AdeTables,
          private helpers: HelpersService,
        ) {}
       async create(createItsmAllReqStatusDto: CreateItsmAllReqStatusDto, payload: any,assets: any) {
        
          // const thisTableInfo = await this.adeTables.findOne({where: { table_name: 'itsm_all_req_status',is_active:true, }});
          // if (!thisTableInfo) throw new ForbiddenException();
          // const canCreate = await this.role_table.findOne({
          //   where: {
          //     role_id: payload.role,
          //     table_id: thisTableInfo.id,
          //     access_type: 'All' || 'Create',
          //     is_active:true,
          //   },
          // });
          // if (!canCreate) throw new UnauthorizedException();
          if (assets.length > 0) {
            const file_name = assets[0].filename
            const photo = process.env.BASE_URL + 'images/users/' + file_name;                  
            await this.itsm_all_req_status.create({
              ...createItsmAllReqStatusDto,
                     
              created_by: payload.sub,            
            });    
          }
          else{
            await this.itsm_all_req_status.create({
              ...createItsmAllReqStatusDto,            
              created_by: payload.sub,            
            });
          }
          
          return ['one itsm_all_req_status added!'];          
  }

    async findAll(
      attributes: string,
      includes: string,
      iattributes: string,
      isDropDown = false,
      page: number, 
      size: number, 
      field: string, 
      search: string,
      payload: any) {
      const condition = field
        ? { [field]: { [sequelize.Op.like]:`%${search}%` }}
        : {};
      const { limit, offset } = this.helpers.getPagination(page, size);
      const modelIncludes = includes ? JSON.parse(includes) : null;
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;    
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_all_req_status',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canRead = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Read',
      //     is_active:true,
      //   },
      // });
      // if (!canRead) throw new UnauthorizedException();
      const data = await this.itsm_all_req_status.findAndCountAll({        
        order: [['id', 'DESC']],
        attributes: attributes ? JSON.parse(attributes) : null,
        include: [],
        where: condition,
        limit,
        offset,
      });
      const count = data.count;
      const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }),'itsm_all_req_status'),
    );
      const response = this.helpers.getPagingData(isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => m.get({ plain: true })),
              JSON.parse(attributes)[1],
              'label',
            ),
          }
        : { count: count, rows: plain }, page, limit,'itsm_all_req_status');
      return response || {};
    
  }

    async findOne(id: number, payload: any) {       
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_all_req_status',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canRead = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Read',
      //     is_active:true,
      //   },
      // });
      // if (!canRead) throw new UnauthorizedException();
      const response = await this.itsm_all_req_status.findOne({
            where: {
              id,              
            },
            attributes: {
        exclude: [
          'is_active',
          'created_at',
          'created_by',
          'updated_at',
          'updated_by',
          'deleted_at',
        ],
      },
            include: [],
          });
          return response || {};
      
    }

  async update(id: number, updateItsmAllReqStatusDto: UpdateItsmAllReqStatusDto,payload: any,assets: any) {   
      // const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_all_req_status',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canUpdate = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Update',
      //     is_active:true,
      //   },
      // });
      // if (!canUpdate) throw new UnauthorizedException();
      if (assets.length > 0) {
        const file_name = assets[0].filename
        const photo = process.env.BASE_URL + 'images/users/' + file_name;            
        await this.itsm_all_req_status.update({
          ...updateItsmAllReqStatusDto,
                       
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,            
        },
        { where: { id }, returning: true },
        );    
      }
      else{
        await this.itsm_all_req_status.update({
          ...updateItsmAllReqStatusDto,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,     
        },
          { where: { id }, returning: true },
        );
      }      

    return ["itsm_all_req_status updated!"];
    
  }

  async remove(id: number, payload: any) {     
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_all_req_status',is_active:true, },
      // });
      // if (!thisTableInfo) throw new ForbiddenException();
      // const canDelete = await this.role_table.findOne({
      //   where: {
      //     role_id: payload.role,
      //     table_id: thisTableInfo.id,
      //     access_type: 'All' || 'Delete',
      //     is_active:true,
      //   },
      // });
      // if (!canDelete) throw new UnauthorizedException();
      const response = await this.itsm_all_req_status.update(
            {
                is_active: 0,
                deleted_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
              },
              { where: { id } },
            );
            return ["one record deleted from itsm_all_req_status!"];
    }
  }
  
