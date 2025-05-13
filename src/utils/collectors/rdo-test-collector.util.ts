import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../../providers/user.provider';
import { TestVector } from './interfaces/test-vector';
import { TestTypesProvider } from '../../providers/test-types.provider';
import { RdoTestEntity } from '../../entities/rdo-test.entity';

@Injectable()
export class RdoTestCollectorUtil {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async collectSimpleRDO(userId: number) {
    return await this.collect(userId, 'SIMPLE_RDO');
  }

  public async collectHardRDO(userId: number) {
    return await this.collect(userId, 'HARD_RDO');
  }

  private async collect(userId: number, testTypeName: string) {
    await this.userProvider.getUserById(userId);
    const testType = await this.testTypesProvider.getTypeByName(testTypeName);

    const tests = await RdoTestEntity.findAll({
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
