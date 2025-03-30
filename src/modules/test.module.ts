import { Module } from '@nestjs/common';
import { TestTypes } from '../entities/test-types.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtDecoderUtil } from '../utils/jwt-decoder.util';
import { TestTypesProvider } from '../providers/test-types.provider';
import { TestTypesController } from '../controllers/test-types.controller';
import { UserModule } from './user.module';
import { SimpleLightTestEntity } from '../entities/simple-light-test.entity';
import { SimpleLightTestController } from '../controllers/simple-light-test.controller';
import { SimpleLightTestProvider } from '../providers/tests-providers/simple-light-test.provider';
import { TestValidationStrategy } from '../strategies/test-validation.strategy';
import { SimpleSoundTestController } from '../controllers/simple-sound-test.controller';
import { SimpleSoundTestProvider } from '../providers/tests-providers/simple-sound-test.provider';
import { SimpleSoundTestEntity } from '../entities/simple-sound-test.entity';
import { HardLightTestEntity } from '../entities/hard-light-test.entity';
import { HardLightTestController } from '../controllers/hard-light-test.controller';
import { HardLightTestProvider } from '../providers/tests-providers/hard-light-test.provider';
import { AdditionTestEntity } from '../entities/addition-test.entity';
import { AdditionTestController } from '../controllers/additional-test.controller';
import { AdditionTestProvider } from '../providers/tests-providers/addition-test.provider';
import { JwtTestLinksGeneratorUtil } from '../utils/jwt-test-links-generator.util';
import { JwtGuardModule } from './jwt.guard.module';
import { InvitationTestsProvider } from '../providers/invitation-tests.provider';
import { JwtTestsFeedbackGeneratorUtil } from '../utils/jwt-tests-feedback-generator.util';
import { UpdateTestUserIdStrategy } from '../strategies/update-test-user-id.strategy';
import { TestsController } from '../controllers/tests.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      SimpleLightTestEntity,
      SimpleSoundTestEntity,
      HardLightTestEntity,
      AdditionTestEntity,
    ]),
    UserModule,
    JwtGuardModule,
  ],
  controllers: [
    TestTypesController,
    SimpleLightTestController,
    SimpleSoundTestController,
    HardLightTestController,
    AdditionTestController,
    TestsController,
  ],
  providers: [
    JwtDecoderUtil,
    JwtTestsFeedbackGeneratorUtil,
    InvitationTestsProvider,
    TestValidationStrategy,
    TestTypesProvider,
    SimpleLightTestProvider,
    SimpleSoundTestProvider,
    HardLightTestProvider,
    AdditionTestProvider,
    JwtTestLinksGeneratorUtil,
    UpdateTestUserIdStrategy,
  ],
  exports: [],
})
export class TestModule {}
