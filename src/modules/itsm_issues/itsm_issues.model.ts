/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { ItsmAttachments } from '../itsm_attachments/itsm_attachments.model';
import { ItsmServiceCategories } from '../itsm_service_categories/itsm_service_categories.model';
import { AdeUsers } from '../ade_users/ade_users.model';
import { ItsmAllReqStatus } from '../itsm_all_req_status/itsm_all_req_status.model';

@Table({
  tableName: 'itsm_issues',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class ItsmIssues extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  service_id: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  issue_type: number;

  @Column({ type: DataType.TEXT, unique: false, allowNull: true })
  service_details: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  justification: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  urgency: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  priority: number;

  @Column({ type: DataType.DATE, unique: false, allowNull: true })
  deadline: Date;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  additional_instruction: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  comments: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  })
  is_active: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;
  @BelongsTo(()=>AdeUsers,'created_by')
  createdby: AdeUsers;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @HasMany(() => ItsmAttachments)
  attachment_id?: ItsmAttachments[];


  @ForeignKey(() => ItsmServiceCategories)
  @Column({
    type: DataType.INTEGER,
  })
  service_category_id?: number;
  @BelongsTo(()=>ItsmServiceCategories,'service_category_id')
  service_category: ItsmServiceCategories;


  @ForeignKey(() => AdeUsers)
  @Column({
    type: DataType.INTEGER,
  })
  raised_for?: number;
  @BelongsTo(()=>AdeUsers,'raised_for')
  raisedfor: AdeUsers;


  @ForeignKey(() => ItsmAllReqStatus)
  @Column({
    type: DataType.INTEGER,
  })
  status_id?: number;
  @BelongsTo(()=>ItsmAllReqStatus,'status_id')
  status: ItsmAllReqStatus;


  @ForeignKey(() => AdeUsers)
  @Column({
    type: DataType.INTEGER,
  })
  assignee?: number;
  @BelongsTo(()=>AdeUsers,'assignee')
  assignto: AdeUsers;
}
