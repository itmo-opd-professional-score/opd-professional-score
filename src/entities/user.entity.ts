import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RolesEnum } from '../config/enums/roles.enum';
import { Test } from './test.entity';
import { TestToUserDashboard } from './test-to-user-dashboard.entity';
import { TestBlock } from './test-blocks.entity';
import { ProfessionScores } from './profession-scores.entity';
import { SimpleLightTestEntity } from './simple-light-test.entity';
import { SimpleSoundTestEntity } from './simple-sound-test.entity';
import { HardLightTestEntity } from './hard-light-test.entity';
import { AdditionTestEntity } from './addition-test.entity';
import { GenderEnum } from '../config/enums/gender.enum';

@Table({ tableName: 'user' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Unique
  @Column({ allowNull: false })
  email: string;

  @Column({
    type: DataType.ENUM(...Object.values(RolesEnum)),
    allowNull: false,
  })
  role: RolesEnum;

  @Column({ allowNull: false })
  password: string;

  @Column
  isBanned: boolean;

  @Column({ allowNull: true })
  age: Date;

  @Column({
    allowNull: true,
    type: DataType.ENUM(...Object.values(GenderEnum)),
  })
  gender: GenderEnum;

  @HasMany(() => ProfessionScores, { onDelete: 'CASCADE' })
  profScores: ProfessionScores[];

  @HasMany(() => Test, { onDelete: 'CASCADE' })
  test: Test[];

  @HasMany(() => SimpleLightTestEntity, { onDelete: 'CASCADE' })
  simpleLightTest: SimpleLightTestEntity;

  @HasMany(() => SimpleSoundTestEntity, { onDelete: 'CASCADE' })
  simpleSoundTest: SimpleSoundTestEntity;

  @HasMany(() => HardLightTestEntity, { onDelete: 'CASCADE' })
  hardLightTest: HardLightTestEntity;

  @HasMany(() => AdditionTestEntity, { onDelete: 'CASCADE' })
  additionTest: AdditionTestEntity;

  @HasMany(() => TestBlock, { onDelete: 'CASCADE' })
  testBlocks: TestBlock[];

  @BelongsToMany(() => Test, () => TestToUserDashboard)
  tests: Test[];
}
