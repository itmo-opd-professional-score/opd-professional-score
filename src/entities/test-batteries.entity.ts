import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestInTestBatteryEntity } from './test-in-test-battery.entity';

@Table({ tableName: 'test-batteries' })
export class TestBatteriesEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => TestInTestBatteryEntity)
  testInTestBattery: TestInTestBatteryEntity;
}
