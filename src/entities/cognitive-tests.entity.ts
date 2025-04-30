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

@Table({ tableName: 'cognitive-tests' })
export class CognitiveTestsEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  allSignals: number;

  @Column({ allowNull: false })
  score: number;

  @Column({ allowNull: false })
  mistakes: number;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypesId: number;

  @BelongsTo(() => TestTypes)
  testTypes: TestTypes;

  @Column({ allowNull: false })
  valid: boolean;
}
