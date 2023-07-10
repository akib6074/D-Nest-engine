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
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';
export const privilegeTypes = [
  'All',
  'Create',
  'Read',
  'Update',
  'Delete',
  'None',
];
@Table({
  tableName: 'ade_role_table',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeRoleTable extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column(DataType.ENUM({ values: privilegeTypes }))
  access_type!: string;

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

  @ForeignKey(() => AdeTables)
  @Column({
    type: DataType.INTEGER,
  })
  table_id?: number;

  @BelongsTo(() => AdeRoles)
  AdeRole?: AdeRoles;

  @BelongsTo(() => AdeTables)
  AdeTable?: AdeTables;
}
