import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TEXT } from 'sequelize';

@Table({ tableName: 'test-block' })
export class TestBlockEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, type: TEXT })
  testBlockToken: string;
}
