import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../../providers/user.provider';
import { SimpleLightTestEntity } from '../../entities/simple-light-test.entity';
import { TestVector } from './interfaces/test-vector';

@Injectable()
export class SimpleLightTestCollectorUtil {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  public async collect(userId: number) {
    await this.userProvider.getUserById(userId);
    const tests = await SimpleLightTestEntity.findAll({
      where: { userId: userId },
    });

    const count = tests.length == 0 ? 1 : tests.length;
    let scoreSum = 0;
    let scoreTime = 0;

    tests.forEach((test) => {
      scoreSum += test.allSignals - test.misclicks;
      scoreTime += test.averageCallbackTime;
    });

    const res: TestVector = {
      averageScore: scoreSum / count,
      averageCallbackTime: scoreTime / count,
    };

    return res;
  }
}
