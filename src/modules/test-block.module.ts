import { Module } from '@nestjs/common';
import { TestBlockEntity } from '../entities/test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';
import { TestBlockProvider } from '../providers/test-block.provider';
import { TestBlockController } from '../controllers/test-block.controller';
import { JwtGuardModule } from './jwt.guard.module';

@Module({
  imports: [
    SequelizeModule.forFeature([TestBlockEntity, UserToTestBlockEntity]),
    JwtGuardModule,
  ],
  providers: [TestBlockProvider],
  controllers: [TestBlockController],
  exports: [],
})
export class TestBlockModule {}
