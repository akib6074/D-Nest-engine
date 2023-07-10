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
import { AdeTables } from 'src/modules/ade_tables/ade_tables.model';

@Table({
  tableName: 'ade_attributes',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class AdeAttributes extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false })
  attribute_name!: string;

  @Column({ type: DataType.STRING, unique: false })
  attribute_name_bn!: string;

  @Column({ type: DataType.STRING, unique: false })
  attribute_type!: string;

  @Column({ type: DataType.BOOLEAN, unique: false })
  primaryKey!: boolean;

  @Column({ type: DataType.BOOLEAN, unique: false })
  foreignKey!: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  foreign_table_id?: number;

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

  @ForeignKey(() => AdeTables)
  @Column({
    type: DataType.INTEGER,
  })
  ade_table_id?: number;

  @BelongsTo(() => AdeTables)
  AdeTable?: AdeTables;
}
