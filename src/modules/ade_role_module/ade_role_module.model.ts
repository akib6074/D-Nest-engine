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
import { AdeRoles } from 'src/modules/ade_roles/ade_roles.model';
import { AdeModules } from 'src/modules/ade_modules/ade_modules.model';

@Table({
  tableName: 'ade_role_module',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeRoleModule extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, unique: false })
  accesible!: number;

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

  // @Column({type: DataType.DATE})
  // deleted_at?: Date;

  @ForeignKey(() => AdeRoles)
  @Column({
    type: DataType.INTEGER,
  })
  ade_roles_id?: number;

  @ForeignKey(() => AdeModules)
  @Column({
    type: DataType.INTEGER,
  })
  ade_modules_id?: number;

  @BelongsTo(() => AdeRoles)
  AdeRoles?: AdeRoles;

  @BelongsTo(() => AdeModules)
  AdeModules?: AdeModules;
}
