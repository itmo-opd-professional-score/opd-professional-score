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

@Table({ tableName: 'hard-tracking-tests' })
export class HardTrackingTests extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testTypes: TestTypes;

  @Column({ allowNull: false })
  duration: number;

  @Column({ allowNull: false, type: FLOAT })
  totalOverlap: number;

  @Column({ allowNull: false, type: FLOAT })
  bestOverlap: number;

  @Column({ allowNull: false, type: FLOAT })
  averageOverlap: number;

  @Column({ allowNull: false })
  overlapCount: number;

  @Column({ allowNull: false, type: FLOAT })
  score: number;

  @Column({ allowNull: false })
  valid: boolean;
}
