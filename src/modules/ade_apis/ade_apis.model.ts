/* eslint-disable prettier/prettier */
import { AdeRoleApi } from 'src/modules/ade_role_api/ade_role_api.model';

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

@Table({
  tableName: 'ade_apis',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeApis extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  api_path?: string;

  @Column({ type: DataType.STRING, unique: false })
  api_method?: string;

  @Column({ type: DataType.STRING, unique: false })
  table_name?: string;

  @Column({ type: DataType.INTEGER, unique: false })
  menu_id?: number;

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

  @HasMany(() => AdeRoleApi)
  ade_role_api?: AdeRoleApi[];
}
