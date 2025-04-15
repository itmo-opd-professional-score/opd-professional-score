import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { FLOAT } from 'sequelize';
import { TestTypes } from './test-types.entity';

@Table({ tableName: 'tests-settings' })
export class TestSetupEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  testName: string;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testTypes: TestTypes;

  @Column({ allowNull: false })
  duration: number;

  @Column({ allowNull: false })
  showTimer: boolean;

  @Column({ allowNull: false })
  showMinuteResults: boolean;

  @Column({ allowNull: false })
  showTotalResults: boolean;

  @Column({ allowNull: false })
  showProgress: boolean;

  @Column({ allowNull: false, type: FLOAT })
  accelerationAmount: number;

  @Column({ allowNull: false, type: FLOAT })
  accelerationInterval: number;

  @Column({ allowNull: false, type: FLOAT })
  accelerationFrequency: number;
}
