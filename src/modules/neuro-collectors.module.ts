import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { TestModule } from './test.module';
import { AdditionTestCollectorUtil } from '../utils/collectors/addition-test-collector.util';
import { CognitiveTestCollectorUtil } from '../utils/collectors/cognitive-test-collector.util';
import { HardLightTestCollectorUtil } from '../utils/collectors/hard-light-test-collector.util';
import { HardTrackingTestCollectorUtil } from '../utils/collectors/hard-tracking-test-collector.util';
import { RdoTestCollectorUtil } from '../utils/collectors/rdo-test-collector.util';
import { SimpleLightTestCollectorUtil } from '../utils/collectors/simple-light-test-collector.util';
import { SimpleSoundTestCollectorUtil } from '../utils/collectors/simple-sound-test-collector.util';
import { SimpleTrackingTestCollectorUtil } from '../utils/collectors/simple-tracking-test-collector.util';
import { FinalCollectorUtil } from '../utils/collectors/final-collector.util';
import { NeuroController } from '../utils/collectors/controllers/neuro.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, TestModule, HttpModule],
  providers: [
    AdditionTestCollectorUtil,
    CognitiveTestCollectorUtil,
    HardLightTestCollectorUtil,
    HardTrackingTestCollectorUtil,
    RdoTestCollectorUtil,
    SimpleLightTestCollectorUtil,
    SimpleSoundTestCollectorUtil,
    SimpleTrackingTestCollectorUtil,
    FinalCollectorUtil,
  ],
  controllers: [NeuroController],
  exports: [],
})
export class NeuroCollectorsModule {}
