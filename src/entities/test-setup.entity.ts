import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestTypes } from './test-types.entity';
import { AccelerationModesEnum } from '../config/enums/acceleration-modes.enum';

@Table({ tableName: 'tests-setups' })
export class TestSetupEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  testName: string;

  @ForeignKey(() => TestTypes)
  @Column({ allowNull: false })
  testTypeId: number;

  @BelongsTo(() => TestTypes)
  testTypes: TestTypes;

  @Column({ allowNull: false })
  duration: number;

  @Column({ allowNull: false })
  showTimer: boolean;

  @Column({ allowNull: false })
  showTotalResults: boolean;

  @Column({ allowNull: false })
  showProgress: boolean;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(AccelerationModesEnum)),
  })
  accelerationMode: AccelerationModesEnum;
}
