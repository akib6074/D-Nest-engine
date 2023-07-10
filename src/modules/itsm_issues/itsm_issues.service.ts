/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import sequelize from "sequelize";
import { HelpersService } from "src/helpers/helpers/helpers.service";
import { ItsmIssues } from "./itsm_issues.model";
import { CreateItsmIssuesDto } from "./dto/create-itsm_issues.dto";
import { UpdateItsmIssuesDto } from "./dto/update-itsm_issues.dto";
import { AdeTables } from "../ade_tables/ade_tables.model";
import { AdeRoleTable } from "../ade_role_table/ade_role_table.model";
import * as moment from "moment";
import { ItsmAttachments } from "../itsm_attachments/itsm_attachments.model";
import { CreateItsmAttachmentsDto } from "../itsm_attachments/dto/create-itsm_attachments.dto";
import { CustomeUIDService } from "../common-services/customUID.service";
import { AdeUsers } from "../ade_users/ade_users.model";
import { ItsmAllReqStatus } from "../itsm_all_req_status/itsm_all_req_status.model";
import { ItsmServiceCategories } from "../itsm_service_categories/itsm_service_categories.model";
@Injectable()
export class ItsmIssuesService {
  constructor(
    @InjectModel(ItsmIssues)
    private itsm_issues: typeof ItsmIssues,
    @InjectModel(AdeRoleTable)
    private role_table: typeof AdeRoleTable,
    @InjectModel(AdeTables)
    private adeTables: typeof AdeTables,
    @InjectModel(ItsmAttachments)
    private itsm_attachments: typeof ItsmAttachments,
    private helpers: HelpersService,
    private customUIDService: CustomeUIDService
  ) {}
  async create(
    createItsmIssuesDto: CreateItsmIssuesDto,
    payload: any,
    assets: any
  ) {
    createItsmIssuesDto.service_id =
      await this.customUIDService.generateCustomeId(
        createItsmIssuesDto.custom_id,
        ""
      );
    await this.itsm_issues
      .create({
        ...createItsmIssuesDto,
        created_by: payload.sub,
        status_id: 1,
      })
      .then(async (res) => {
        if (createItsmIssuesDto?.files) {
          createItsmIssuesDto?.files?.map(async (file) => {
            const attachmentDto = new CreateItsmAttachmentsDto();
            attachmentDto.mime_type = file.mimetype;
            attachmentDto.original_name = file.originalname;
            attachmentDto.path = file.path.replace(/\\/g, "/");
            attachmentDto.url =
              process.env.IMAGE_URL +
              ":" +
              process.env.APP_PORT +
              "/" +
              file.path;
            attachmentDto.issue_id = res?.id;
            await this.itsm_attachments.create({
              ...attachmentDto,
              created_by: +payload.sub,
            });
          });
        }
      });
    return ["one itsm_issue added!"];
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
    payload: any
  ) {
    const condition = field
      ? { [field]: { [sequelize.Op.like]: `%${search}%` } }
      : {};
    const { limit, offset } = this.helpers.getPagination(page, size);
    const modelIncludes = includes ? JSON.parse(includes) : null;
    console.log(modelIncludes);
    const attributesInclude = iattributes ? JSON.parse(iattributes) : null;
    //   const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'itsm_issues',is_active:true, },
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
    // console.log(JSON.parse(attributes));
    const data = await this.itsm_issues.findAndCountAll({
      order: [["id", "DESC"]],
      attributes: {
        exclude: [
          attributesInclude,
          "is_active",
          "is_active",
          "updated_by",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
      },
      include: [
        { model: AdeUsers, attributes: ["user_name"], as: "assignto" },
        { model: AdeUsers, attributes: ["user_name"], as: "createdby" },
        { model: AdeUsers, attributes: ["user_name"], as: "raisedfor" },
        { model: ItsmAllReqStatus, attributes: ["name"] },
        { model: ItsmServiceCategories, attributes: ["name"] },
      ],
      where: condition,
      limit,
      offset,
    }); //[{model: AdeUsers},{model: ItsmAllReqStatus}]
    const count = data.count;
    const plain = data.rows.map((m) => {
      return this.helpers.flattenObject(m.get({ plain: true }), "itsm_issues");
    });
    const response = this.helpers.getPagingData(
      isDropDown
        ? {
            count: data.count,
            rows: this.helpers.changeSpecificKeyOfObjectArray(
              data.rows.map((m) => {
                return m.get({ plain: true });
              }),
              JSON.parse(attributes)[1],
              "label"
            ),
          }
        : { count: count, rows: plain },
      page,
      limit,
      "itsm_issues"
    );
    return response || {};
  }

  async findOne(id: number, payload: any) {
    //   const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'itsm_issues',is_active:true, },
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
    const response = await this.itsm_issues.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [
          "is_active",
          "is_active",
          "updated_by",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
      },
      include: [
        { model: AdeUsers, attributes: ["user_name"], as: "assignto" },
        { model: AdeUsers, attributes: ["user_name"], as: "createdby" },
        { model: AdeUsers, attributes: ["user_name"], as: "raisedfor" },
        { model: ItsmAllReqStatus, attributes: ["name"] },
        { model: ItsmServiceCategories, attributes: ["name"] },
      ],
    });
    return response || {};
  }

  async update(
    id: number,
    updateItsmIssuesDto: UpdateItsmIssuesDto,
    payload: any,
    assets: any
  ) {
    // const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'itsm_issues',is_active:true, },
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
      const file_name = assets[0].filename;
      const photo = process.env.BASE_URL + "images/users/" + file_name;
      await this.itsm_issues.update(
        {
          ...updateItsmIssuesDto,

          updated_at: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          updated_by: payload.sub,
        },
        { where: { id }, returning: true }
      );
    } else {
      await this.itsm_issues.update(
        {
          ...updateItsmIssuesDto,
          updated_at: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          updated_by: payload.sub,
        },
        { where: { id }, returning: true }
      );
    }

    return ["itsm_issues updated!"];
  }

  async remove(id: number, payload: any) {
    //   const thisTableInfo = await this.adeTables.findOne({
    //   where: { table_name: 'itsm_issues',is_active:true, },
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
    const response = await this.itsm_issues.update(
      {
        is_active: 0,
        deleted_at: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
      },
      { where: { id } }
    );
    return ["one record deleted from itsm_issues!"];
  }
}
