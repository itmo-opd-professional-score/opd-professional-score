import { Module } from '@nestjs/common';
import { TestBlockEntity } from '../entities/test-block.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserToTestBlockEntity } from '../entities/user-to-test-block.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([TestBlockEntity, UserToTestBlockEntity]),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class TestBlockModule {}
