/* eslint-disable prettier/prettier */
import { ForbiddenException,UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HelpersService } from 'src/helpers/helpers/helpers.service';
import { ItsmUniqueId } from './itsm_unique_id.model';
import { CreateItsmUniqueIdDto } from './dto/create-itsm_unique_id.dto';
import { UpdateItsmUniqueIdDto } from './dto/update-itsm_unique_id.dto';
import { AdeTables } from '../ade_tables/ade_tables.model';
import { AdeRoleTable } from '../ade_role_table/ade_role_table.model';
import * as moment from "moment";
@Injectable()
      export class ItsmUniqueIdService {
        constructor(
          @InjectModel(ItsmUniqueId)
          private itsm_unique_id: typeof ItsmUniqueId,
          @InjectModel(AdeRoleTable) 
          private role_table: typeof AdeRoleTable,
          @InjectModel(AdeTables) 
          private adeTables: typeof AdeTables,
          private helpers: HelpersService,
        ) {}
       async create(createItsmUniqueIdDto: CreateItsmUniqueIdDto, payload: any,assets: any) {
        
          // const thisTableInfo = await this.adeTables.findOne({where: { table_name: 'itsm_unique_id',is_active:true, }});
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
            await this.itsm_unique_id.create({
              ...createItsmUniqueIdDto,
                     
              created_by: payload.sub,            
            });    
          }
          else{
            await this.itsm_unique_id.create({
              ...createItsmUniqueIdDto,            
              created_by: payload.sub,            
            });
          }
          
          return ['one itsm_unique_id added!'];          
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
      //   where: { table_name: 'itsm_unique_id',is_active:true, },
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
      const data = await this.itsm_unique_id.findAndCountAll({        
        order: [['id', 'DESC']],
        attributes: attributes ? JSON.parse(attributes) : null,
        include: [],
        where: condition,
        limit,
        offset,
      });
      const count = data.count;
      const plain = data.rows.map((m) =>
      this.helpers.flattenObject(m.get({ plain: true }),'itsm_unique_id'),
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
        : { count: count, rows: plain }, page, limit,'itsm_unique_id');
      return response || {};
    
  }

    async findOne(id: number, payload: any) {       
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_unique_id',is_active:true, },
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
      const response = await this.itsm_unique_id.findOne({
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

  async update(id: number, updateItsmUniqueIdDto: UpdateItsmUniqueIdDto,payload: any,assets: any) {   
      // const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_unique_id',is_active:true, },
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
        await this.itsm_unique_id.update({
          ...updateItsmUniqueIdDto,
                       
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,            
        },
        { where: { id }, returning: true },
        );    
      }
      else{
        await this.itsm_unique_id.update({
          ...updateItsmUniqueIdDto,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          updated_by: payload.sub,     
        },
          { where: { id }, returning: true },
        );
      }      

    return ["itsm_unique_id updated!"];
    
  }

  async remove(id: number, payload: any) {     
      //   const thisTableInfo = await this.adeTables.findOne({
      //   where: { table_name: 'itsm_unique_id',is_active:true, },
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
      const response = await this.itsm_unique_id.update(
            {
                is_active: 0,
                deleted_at: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
              },
              { where: { id } },
            );
            return ["one record deleted from itsm_unique_id!"];
    }
  }
  
