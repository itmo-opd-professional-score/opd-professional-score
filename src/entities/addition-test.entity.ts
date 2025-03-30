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
import { TestTypes } from './test-types.entity';
import { FLOAT } from 'sequelize';

@Table({ tableName: 'addition-test' })
export class AdditionTestEntity extends Model {
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
  @Column
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testType: TestTypes;

  @Column({ allowNull: false, type: FLOAT })
  averageCallbackTime: number;

  @Column({ allowNull: false, type: FLOAT })
  dispersion: number;

  @Column({ allowNull: false })
  allSignals: number;

  @Column({ allowNull: false })
  mistakes: number;

  @Column({ allowNull: false })
  valid: boolean;
}
