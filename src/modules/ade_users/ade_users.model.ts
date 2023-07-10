/* eslint-disable prettier/prettier */
import { AdeUserModule } from '../ade_user_module/ade_user_module.model';

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
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { ItsmIssues } from '../itsm_issues/itsm_issues.model';

@Table({
  tableName: 'ade_users',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeUsers extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  user_name!: string;

  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, unique: false })
  password!: string;

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

  // @Column({ type: DataType.DATE })
  // deleted_at?: Date;

  @ForeignKey(() => AdeRoles)
  @Column({
    type: DataType.INTEGER,
  })
  role_id?: number;

  @BelongsTo(() => AdeRoles)
  AdeRole?: AdeRoles;

  @HasMany(() => AdeUserModule)
  ade_user_module?: AdeUserModule[];

  @HasMany(() => ItsmIssues,'raised_for')
  issue_id?: ItsmIssues[];

  @HasMany(() => ItsmIssues,'assignee')
  issues_id?: ItsmIssues[];
}
