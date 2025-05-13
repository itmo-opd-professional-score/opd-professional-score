import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestSetupEntity } from './test-setup.entity';
import { TestBatteriesEntity } from './test-batteries.entity';

@Table({ tableName: 'test-in-test-battery' })
export class TestInTestBatteryEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @ForeignKey(() => TestSetupEntity)
  @Column({ allowNull: true })
  setupId: number;

  @BelongsTo(() => TestSetupEntity)
  testSetup: TestSetupEntity;

  @ForeignKey(() => TestBatteriesEntity)
  @Column({ allowNull: false })
  testBatteryId: number;

  @BelongsTo(() => TestBatteriesEntity)
  testBattery: TestBatteriesEntity;
}
