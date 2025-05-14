import { Inject, Injectable } from '@nestjs/common';
import { AdditionTestCollectorUtil } from './addition-test-collector.util';
import { CognitiveTestCollectorUtil } from './cognitive-test-collector.util';
import { HardLightTestCollectorUtil } from './hard-light-test-collector.util';
import { HardTrackingTestCollectorUtil } from './hard-tracking-test-collector.util';
import { RdoTestCollectorUtil } from './rdo-test-collector.util';
import { SimpleLightTestCollectorUtil } from './simple-light-test-collector.util';
import { SimpleSoundTestCollectorUtil } from './simple-sound-test-collector.util';
import { SimpleTrackingTestCollectorUtil } from './simple-tracking-test-collector.util';
import { TestVector } from './interfaces/test-vector';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface PredictionResponse {
  profession: string;
  confidence: number;
}

@Injectable()
export class FinalCollectorUtil {
  constructor(
    @Inject(AdditionTestCollectorUtil)
    private additionTestCollectorUtil: AdditionTestCollectorUtil,
    @Inject(CognitiveTestCollectorUtil)
    private cognitiveTestCollectorUtil: CognitiveTestCollectorUtil,
    @Inject(HardLightTestCollectorUtil)
    private hardLightTestCollectorUtil: HardLightTestCollectorUtil,
    @Inject(HardTrackingTestCollectorUtil)
    private hardTrackingTestCollectorUtil: HardTrackingTestCollectorUtil,
    @Inject(RdoTestCollectorUtil)
    private rdoTestCollectorUtil: RdoTestCollectorUtil,
    @Inject(SimpleLightTestCollectorUtil)
    private simpleLightTestCollectorUtil: SimpleLightTestCollectorUtil,
    @Inject(SimpleSoundTestCollectorUtil)
    private simpleSoundTestCollectorUtil: SimpleSoundTestCollectorUtil,
    @Inject(SimpleTrackingTestCollectorUtil)
    private simpleTrackingTestCollectorUtil: SimpleTrackingTestCollectorUtil,
    @Inject(HttpService) private httpService: HttpService,
  ) {}

  public async collectDataForInfo(userId: number) {
    const res: TestVector[] = [];

    res.push(await this.additionTestCollectorUtil.collectSound(userId));
    res.push(await this.additionTestCollectorUtil.collectVisual(userId));
    res.push(await this.cognitiveTestCollectorUtil.collectNumerical(userId));
    res.push(await this.cognitiveTestCollectorUtil.collectStroop(userId));
    res.push(await this.cognitiveTestCollectorUtil.collectVerbal(userId));
    res.push(await this.hardLightTestCollectorUtil.collect(userId));
    res.push(await this.hardTrackingTestCollectorUtil.collect(userId));
    res.push(await this.rdoTestCollectorUtil.collectHardRDO(userId));
    res.push(await this.rdoTestCollectorUtil.collectSimpleRDO(userId));
    res.push(await this.simpleLightTestCollectorUtil.collect(userId));
    res.push(await this.simpleSoundTestCollectorUtil.collect(userId));
    res.push(await this.simpleTrackingTestCollectorUtil.collect(userId));

    return res;
  }

  public async collectDataForPrediction(userId: number) {
    const res: number[] = [];
    res.push(
      (await this.additionTestCollectorUtil.collectSound(userId)).averageScore,
    );
    res.push(
      (await this.additionTestCollectorUtil.collectSound(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.additionTestCollectorUtil.collectVisual(userId)).averageScore,
    );
    res.push(
      (await this.additionTestCollectorUtil.collectVisual(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectNumerical(userId))
        .averageScore,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectNumerical(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectStroop(userId))
        .averageScore,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectStroop(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectVerbal(userId))
        .averageScore,
    );
    res.push(
      (await this.cognitiveTestCollectorUtil.collectVerbal(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.hardLightTestCollectorUtil.collect(userId)).averageScore,
    );
    res.push(
      (await this.hardLightTestCollectorUtil.collect(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.hardTrackingTestCollectorUtil.collect(userId)).averageScore,
    );
    res.push(
      (await this.hardTrackingTestCollectorUtil.collect(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.rdoTestCollectorUtil.collectHardRDO(userId)).averageScore,
    );
    res.push(
      (await this.rdoTestCollectorUtil.collectHardRDO(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.rdoTestCollectorUtil.collectSimpleRDO(userId)).averageScore,
    );
    res.push(
      (await this.rdoTestCollectorUtil.collectSimpleRDO(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.simpleLightTestCollectorUtil.collect(userId)).averageScore,
    );
    res.push(
      (await this.simpleLightTestCollectorUtil.collect(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.simpleSoundTestCollectorUtil.collect(userId)).averageScore,
    );
    res.push(
      (await this.simpleSoundTestCollectorUtil.collect(userId))
        .averageCallbackTime,
    );
    res.push(
      (await this.simpleTrackingTestCollectorUtil.collect(userId)).averageScore,
    );
    res.push(
      (await this.simpleTrackingTestCollectorUtil.collect(userId))
        .averageCallbackTime,
    );

    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:8080/api/v1/perceptron/predict',
        res,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}
