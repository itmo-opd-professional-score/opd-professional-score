import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtGuardModule } from './jwt.guard.module';
import { TestTypesProvider } from '../providers/test-types.provider';
import { TestBlockEntity } from '../entities/test-block.entity';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { TestBlocksProvider } from '../providers/test-blocks.provider';
import { TestBlocksController } from '../controllers/test-blocks.controller';
import { TestBatteriesEntity } from '../entities/test-batteries.entity';
import { TestInTestBatteryEntity } from '../entities/test-in-test-battery.entity';
import { TestBatteryProvider } from '../providers/test-battery/test-battery.provider';
import { TestInTestBatteryProvider } from '../providers/test-battery/test-in-test-battery.provider';
import { TestInTestBatteryController } from '../controllers/test-battery/test-in-test-battery.controller';
import { TestBatteryController } from '../controllers/test-battery/test-battery.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestBlockEntity,
      UserToTestBlockEntity,
      TestBatteriesEntity,
      TestInTestBatteryEntity,
    ]),
    JwtGuardModule,
  ],
  providers: [
    TestTypesProvider,
    TestBlocksProvider,
    TestBatteryProvider,
    TestInTestBatteryProvider,
  ],
  controllers: [
    TestBlocksController,
    TestInTestBatteryController,
    TestBatteryController,
  ],
  exports: [],
})
export class TestBlockModule {}
