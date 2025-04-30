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

  @Column({ allowNull: false })
  duration: number;

  @Column({ allowNull: false })
  totalOverlap: number;

  @Column({ allowNull: false })
  bestOverlap: number;

  @Column({ allowNull: false })
  averageOverlap: number;

  @Column({ allowNull: false })
  overlapCount: number;

  @Column({ allowNull: false })
  successRate: number;

  @Column({ allowNull: false })
  valid: boolean;
}
