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
import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';

@Table({
  tableName: 'ade_menu_priviledge',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeMenuPriviledge extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

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

  //   @Column({ type: DataType.DATE })
  //   deleted_at?: Date;

  @ForeignKey(() => AdeMenus)
  @Column({
    type: DataType.INTEGER,
  })
  menu_id?: number;

  @ForeignKey(() => AdeRoles)
  @Column({
    type: DataType.INTEGER,
  })
  role_id?: number;

  @ForeignKey(() => AdeModules)
  @Column({
    type: DataType.INTEGER,
  })
  module_id?: number;

  @BelongsTo(() => AdeMenus)
  AdeMenus?: AdeMenus;

  @BelongsTo(() => AdeRoles)
  AdeRoles?: AdeRoles;

  @BelongsTo(() => AdeModules)
  AdeModules?: AdeModules;
}
