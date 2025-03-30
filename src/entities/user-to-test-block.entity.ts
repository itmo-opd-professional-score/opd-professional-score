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

@Table({ tableName: 'user-to-test-block' })
export class UserToTestBlockEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @ForeignKey(() => TestBlockEntity)
  @Column({ allowNull: false })
  testBlockId: number;

  @Column
  testBlockToken: string;

  @BelongsTo(() => TestBlockEntity)
  testBlock: TestBlockEntity;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  async beforeSave() {
    const testBlock = await TestBlockEntity.findOne({
      where: { id: this.id },
    });

    if (testBlock != null) {
      this.testBlockToken = testBlock?.testBlockToken;
    }
  }
}
