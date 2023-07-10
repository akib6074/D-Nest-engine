/* eslint-disable prettier/prettier */
import { AdeRoleModule } from 'src/modules/ade_role_module/ade_role_module.model';

import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';

import { AdeUserModule } from 'src/modules/ade_user_module/ade_user_module.model';

import { AdeMenus } from 'src/modules/ade_menus/ade_menus.model';

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
  tableName: 'ade_modules',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class AdeModules extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  module_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  module_url!: string;

  @Column({ type: DataType.STRING, unique: false })
  module_icon_url!: string;

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

  @Column({ type: DataType.DATE })
  deleted_at?: Date;

  // @HasMany(() => AdeMenus)
  // ade_menus?: AdeMenus[];

  @HasMany(() => AdeUserModule)
  ade_user_module?: AdeUserModule[];

  @HasMany(() => AdeMenuPriviledge)
  ade_menu_priviledge?: AdeMenuPriviledge[];

  @HasMany(() => AdeRoleModule)
  ade_role_module?: AdeRoleModule[];
}
