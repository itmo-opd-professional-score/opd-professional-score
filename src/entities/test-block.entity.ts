import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserToTestBlockEntity } from './user-to-test-block.entity';

@Table({ tableName: 'test-block' })
export class TestBlockEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Unique
  @Column({ allowNull: false })
  testBlockToken: string;

  @HasMany(() => UserToTestBlockEntity)
  userToTestBlock: UserToTestBlockEntity;
}
