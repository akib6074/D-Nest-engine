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

@Table({
  tableName: 'itsm_attachments',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class ItsmAttachments extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  mime_type: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  size: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  destination: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  original_name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  url: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  path: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  options: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  })
  is_active: boolean;

  @Column({ type: DataType.INTEGER })
  created_by?: number;

  @Column({ type: DataType.INTEGER })
  updated_by?: number;

  @ForeignKey(() => ItsmIssues)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  issue_id?: number;
}
