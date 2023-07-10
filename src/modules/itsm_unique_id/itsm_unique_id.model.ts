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

@Table({
  tableName: 'itsm_unique_id',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  comment: '',
})
export class ItsmUniqueId extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  id_for: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  id_length: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  id_format: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  starting_id: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  last_gen_id: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  reset_flag: number;

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
}
