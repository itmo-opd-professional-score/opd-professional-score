import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../../providers/user.provider';
import { TestVector } from './interfaces/test-vector';
import { AdditionTestEntity } from '../../entities/addition-test.entity';
import { TestTypesProvider } from '../../providers/test-types.provider';

@Injectable()
export class AdditionTestCollectorUtil {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async collectVisual(userId: number) {
    return await this.collect(userId, 'ADDITION_VISUAL');
  }

  public async collectSound(userId: number) {
    return await this.collect(userId, 'ADDITION_SOUND');
  }

  private async collect(userId: number, testTypeName: string) {
    await this.userProvider.getUserById(userId);
    const testType = await this.testTypesProvider.getTypeByName(testTypeName);

    const tests = await AdditionTestEntity.findAll({
      where: { userId: userId, testTypeId: testType?.id },
    });

    const count = tests.length == 0 ? 1 : tests.length;
    let scoreSum = 0;
    let scoreTime = 0;

    tests.forEach((test) => {
      scoreSum += test.allSignals - test.mistakes;
      scoreTime += test.averageCallbackTime;
    });

    const res: TestVector = {
      averageScore: scoreSum / count,
      averageCallbackTime: scoreTime / count,
    };

    return res;
  }
}
