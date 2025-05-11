import { Inject, Injectable } from '@nestjs/common';
import { SimpleTrackingTestsEntity } from '../../entities/simple-tracking-tests.entity';
import { CreateSttDto } from '../../dto/test/create-stt.dto';
import { UserProvider } from '../user.provider';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { TestTypesProvider } from '../test-types.provider';

@Injectable()
export class SttProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async getAll() {
    return await SimpleTrackingTestsEntity.findAll();
  }

  public async getById(id: number) {
    const test = await SimpleTrackingTestsEntity.findOne({ where: { id: id } });
    if (test == null)
      throw new TestNotFoundException(id, 'id', 'Simple tracking test');

    return test;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await SimpleTrackingTestsEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateSttDto) {
    await this.userProvider.getUserById(data.userId);
    const testType = await this.testTypesProvider.getTypeByName(data.testType);

    const test = await SimpleTrackingTestsEntity.create({
      userId: data.userId,
      allSignals: data.allSignals,
      successCount: data.successCount,
      avgTime: data.avgTime,
      timeDeviation: data.timeDeviation,
      valid: true,
      testType: testType?.id,
    });
    return new BasicSuccessfulResponse(test);
  }
}
