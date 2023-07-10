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
import { AdeUsers } from 'src/modules/ade_users/ade_users.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';

@Table({
  tableName: 'ade_user_module',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeUserModule extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.BOOLEAN, unique: false })
  accessible!: boolean;

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

  @ForeignKey(() => AdeUsers)
  @Column({
    type: DataType.INTEGER,
  })
  user_id?: number;

  @ForeignKey(() => AdeModules)
  @Column({
    type: DataType.INTEGER,
  })
  module_id?: number;

  @BelongsTo(() => AdeUsers)
  AdeUser?: AdeUsers;

  @BelongsTo(() => AdeModules)
  AdeModule?: AdeModules;
}
