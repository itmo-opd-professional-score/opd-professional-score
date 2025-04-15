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

@Table({ tableName: 'rdo-test' })
export class RdoTestEntity extends Model {
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

  @Column({ allowNull: true, type: FLOAT })
  averageCallbackTime: number;

  @Column({ allowNull: true, type: FLOAT })
  dispersion: number;

  @Column({ allowNull: true })
  allSignals: number;

  @Column({ allowNull: true })
  mistakes: number;

  @Column({ allowNull: true })
  valid: boolean;
}
