/* eslint-disable prettier/prettier */
import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';
import { AdeRoleMenu } from 'src/modules/ade_role_menu/ade_role_menu.model';

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
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';

@Table({
  tableName: 'ade_menus',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeMenus extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  menu_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  menu_name_bn!: string;

  @Column({ type: DataType.STRING, unique: false })
  menu_url?: string;

  @Column({ type: DataType.STRING, unique: false })
  menu_icon_url?: string;

  @Column({ type: DataType.INTEGER, unique: false })
  menu_order?: number;

  @Column({ type: DataType.INTEGER, unique: false })
  parent_menu?: number;

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

  // @ForeignKey(() => AdeModules)
  // @Column({
  //   type: DataType.INTEGER,
  // })
  // module_id?: number;

  // @BelongsTo(() => AdeModules)
  // AdeModule?: AdeModules;

  @HasMany(() => AdeRoleMenu)
  ade_role_menu?: AdeRoleMenu[];

  @HasMany(() => AdeMenuPriviledge)
  ade_menu_priviledge?: AdeMenuPriviledge[];
}
