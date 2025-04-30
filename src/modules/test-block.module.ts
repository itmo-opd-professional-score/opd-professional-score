import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestBlockController } from '../controllers/test-block.controller';
import { JwtGuardModule } from './jwt.guard.module';
import { TestTypesProvider } from '../providers/test-types.provider';

@Module({
  imports: [SequelizeModule.forFeature([]), JwtGuardModule],
  providers: [TestTypesProvider],
  controllers: [TestBlockController],
  exports: [],
})
export class TestBlockModule {}
