import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SimpleLightTestEntity } from './simple-light-test.entity';
import { SimpleSoundTestEntity } from './simple-sound-test.entity';
import { HardLightTestEntity } from './hard-light-test.entity';
import { AdditionTestEntity } from './addition-test.entity';

@Table({ tableName: 'test_types' })
export class TestTypes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @HasMany(() => SimpleLightTestEntity, { onDelete: 'CASCADE' })
  simpleLightTest: SimpleLightTestEntity;

  @HasMany(() => SimpleSoundTestEntity, { onDelete: 'CASCADE' })
  simpleSoundTest: SimpleSoundTestEntity;

  @HasMany(() => HardLightTestEntity, { onDelete: 'CASCADE' })
  hardLightTest: HardLightTestEntity;

  @HasMany(() => AdditionTestEntity, { onDelete: 'CASCADE' })
  additionTest: AdditionTestEntity;
}
