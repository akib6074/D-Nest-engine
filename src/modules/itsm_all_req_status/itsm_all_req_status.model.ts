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
import { ItsmIssues } from '../itsm_issues/itsm_issues.model';
import { AdeUsers } from '../ade_users/ade_users.model';

@Table({
  tableName: 'itsm_all_req_status',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class ItsmAllReqStatus extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  name: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  is_active: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @HasMany(() => ItsmIssues)
  issue_id?: ItsmIssues[];
}
