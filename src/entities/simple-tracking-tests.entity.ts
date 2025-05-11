import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { FLOAT } from 'sequelize';
import { TestTypes } from './test-types.entity';

@Table({ tableName: 'simple-tracking-tests' })
export class SimpleTrackingTestsEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testTypes: TestTypes;

  @Column({ allowNull: false })
  allSignals: number;

  @Column({ allowNull: false })
  successCount: number;

  @Column({ allowNull: false, type: FLOAT })
  avgTime: number;

  @Column({ allowNull: false, type: FLOAT })
  timeDeviation: number;

  @Column({ allowNull: false })
  valid: boolean;
}
