import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtGuardModule } from './jwt.guard.module';
import { TestTypesProvider } from '../providers/test-types.provider';
import { TestBlockEntity } from '../entities/test-block.entity';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { TestBlocksProvider } from '../providers/test-blocks.provider';
import { TestBlocksController } from '../controllers/test-blocks.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([TestBlockEntity, UserToTestBlockEntity]),
    JwtGuardModule,
  ],
  providers: [TestTypesProvider, TestBlocksProvider],
  controllers: [TestBlocksController],
  exports: [],
})
export class TestBlockModule {}
