import { CreateSltDto } from '../dto/test/create-slt.dto';
import { CreateHltDto } from '../dto/test/create-hlt.dto';
import { CreateAtDto } from '../dto/test/create-at.dto';
import { Inject, Injectable } from '@nestjs/common';
import { AgeBalancerUtil } from '../utils/age-balancer.util';

@Injectable()
export class TestValidationStrategy {
  constructor(
    @Inject(AgeBalancerUtil) private ageBalancerUtil: AgeBalancerUtil,
  ) {}

  public async validateSimpleTest(data: CreateSltDto) {
    if ((1 - data.misclicks / data.allSignals) * 100 < 80) return false;
    const score = 120 * (await this.ageBalancerUtil.balance(data));
    return data.allSignals >= score;
  }

  public async validateHardLightTest(data: CreateHltDto) {
    if ((1 - (data.mistakes + data.misclicks) / data.allSignals) * 100 < 80)
      return false;
    const score = 60 * (await this.ageBalancerUtil.balance(data));
    return data.allSignals >= score;
  }

  public async validateAdditionTest(data: CreateAtDto) {
    if ((1 - data.mistakes / data.allSignals) * 100 < 80) return false;
    const score = 25 * (await this.ageBalancerUtil.balance(data));
    return data.allSignals >= score;
  }
}
