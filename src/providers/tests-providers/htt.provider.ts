import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../user.provider';
import { HardTrackingTests } from '../../entities/hard-tracking-tests.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { CreateHttDto } from '../../dto/test/create-htt.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { TestTypesProvider } from '../test-types.provider';

@Injectable()
export class HttProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async getAll() {
    return await HardTrackingTests.findAll();
  }

  public async getById(id: number) {
    const test = await HardTrackingTests.findOne({ where: { id: id } });
    if (test == null)
      throw new TestNotFoundException(id, 'id', 'Hard tracking test');

    return test;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await HardTrackingTests.findAll({ where: { userId: userId } });
  }

  public async create(data: CreateHttDto) {
    await this.userProvider.getUserById(data.userId);
    const testType = await this.testTypesProvider.getTypeByName(data.testType);

    const test = await HardTrackingTests.create({
      userId: data.userId,
      duration: data.duration,
      totalOverlap: data.totalOverlapTime,
      bestOverlap: data.bestOverlap,
      averageOverlap: data.averageOverlap,
      overlapCount: data.overlapCount,
      successRate: data.successRate,
      valid: true,
      testTypeId: testType?.id,
    });

    return new BasicSuccessfulResponse(test);
  }
}
