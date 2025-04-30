import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestBlockEntity } from './test-block.entity';
import { User } from './user.entity';
import { TEXT } from 'sequelize';

@Table({ tableName: 'user-to-test-block' })
export class UserToTestBlockEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false, type: TEXT })
  testBlockToken: string;

  @ForeignKey(() => TestBlockEntity)
  testBlockId: number;

  @BelongsTo(() => TestBlockEntity)
  testBlock: TestBlockEntity;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
