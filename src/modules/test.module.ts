import { Module } from '@nestjs/common';
import { TestTypes } from '../entities/test-types.entity';
import { SequelizeModule } from '@nestjs/sequelize';
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
import { UpdateTestUserIdStrategy } from '../strategies/update-test-user-id.strategy';
import { TestsController } from '../controllers/tests.controller';
import { TestSetupEntity } from '../entities/test-setup.entity';
import { TestSetupController } from '../controllers/test-setup.controller';
import { TestSetupProvider } from '../providers/tests-providers/test-setup.provider';
import { RdoTestEntity } from '../entities/rdo-test.entity';
import { RdoTestController } from '../controllers/rdo-test.controller';
import { RdoTestProvider } from '../providers/tests-providers/rdo-test.provider';
import { AgeBalancerUtil } from '../utils/age-balancer.util';
import { CognitiveController } from '../controllers/cognitive-tests.controller';
import { CognitiveTestProvider } from '../providers/tests-providers/cognitive-test.provider';
import { CognitiveTestsEntity } from '../entities/cognitive-tests.entity';
import { SttController } from '../controllers/stt.controller';
import { SttProvider } from '../providers/tests-providers/stt.provider';
import { SimpleTrackingTestsEntity } from '../entities/simple-tracking-tests.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      TestTypes,
      SimpleLightTestEntity,
      SimpleSoundTestEntity,
      HardLightTestEntity,
      AdditionTestEntity,
      TestSetupEntity,
      RdoTestEntity,
      CognitiveTestsEntity,
      SimpleTrackingTestsEntity,
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
    TestSetupController,
    RdoTestController,
    CognitiveController,
    SttController,
  ],
  providers: [
    InvitationTestsProvider,
    TestValidationStrategy,
    TestTypesProvider,
    SimpleLightTestProvider,
    SimpleSoundTestProvider,
    HardLightTestProvider,
    AdditionTestProvider,
    JwtTestLinksGeneratorUtil,
    UpdateTestUserIdStrategy,
    TestSetupProvider,
    RdoTestProvider,
    AgeBalancerUtil,
    CognitiveTestProvider,
    SttProvider,
  ],
  exports: [],
})
export class TestModule {}
