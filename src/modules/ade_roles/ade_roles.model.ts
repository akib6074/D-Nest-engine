/* eslint-disable prettier/prettier */
import { AdeRoleApi } from 'src/modules/ade_role_api/ade_role_api.model';

import { AdeRoleModule } from 'src/modules/ade_role_module/ade_role_module.model';

import { AdeMenuPriviledge } from 'src/modules/ade_menu_priviledge/ade_menu_priviledge.model';

import { AdeRoleMenu } from 'src/modules/ade_role_menu/ade_role_menu.model';

import { AdeRoleTable } from 'src/modules/ade_role_table/ade_role_table.model';

import { AdeUsers } from 'src/modules/ade_users/ade_users.model';

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
  tableName: 'ade_roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '',
})
export class AdeRoles extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  role_name!: string;

  @Column({ type: DataType.INTEGER })
  default_module_id: number;

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

  @HasMany(() => AdeUsers)
  ade_users?: AdeUsers[];

  @HasMany(() => AdeRoleTable)
  ade_role_table?: AdeRoleTable[];

  @HasMany(() => AdeRoleMenu)
  ade_role_menu?: AdeRoleMenu[];

  @HasMany(() => AdeMenuPriviledge)
  ade_menu_priviledge?: AdeMenuPriviledge[];

  @HasMany(() => AdeRoleModule)
  ade_role_module?: AdeRoleModule[];

  @HasMany(() => AdeRoleApi)
  ade_role_api?: AdeRoleApi[];
}
