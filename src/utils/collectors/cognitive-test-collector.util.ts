import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../../providers/user.provider';
import { TestTypesProvider } from '../../providers/test-types.provider';
import { TestVector } from './interfaces/test-vector';
import { CognitiveTestsEntity } from '../../entities/cognitive-tests.entity';

@Injectable()
export class CognitiveTestCollectorUtil {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async collectNumerical(userId: number) {
    return await this.collect(userId, 'NUMERICAL');
  }

  public async collectStroop(userId: number) {
    return await this.collect(userId, 'STROOP');
  }
  public async collectVerbal(userId: number) {
    return await this.collect(userId, 'VERBAL');
  }

  private async collect(userId: number, testTypeName: string) {
    await this.userProvider.getUserById(userId);
    const testType = await this.testTypesProvider.getTypeByName(testTypeName);

    const tests = await CognitiveTestsEntity.findAll({
      where: { userId: userId, testTypeId: testType?.id },
    });

    const count = tests.length == 0 ? 1 : tests.length;
    let scoreSum = 0;
    let scoreTime = 0;

    tests.forEach((test) => {
      scoreSum += test.allSignals - test.mistakes;
      scoreTime += 0;
    });

    const res: TestVector = {
      averageScore: scoreSum / count,
      averageCallbackTime: scoreTime / count,
    };

    return res;
  }
}
