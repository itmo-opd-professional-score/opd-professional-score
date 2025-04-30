import { Inject, Injectable } from '@nestjs/common';
import { SimpleTrackingTestsEntity } from '../../entities/simple-tracking-tests.entity';
import { CreateSttDto } from '../../dto/test/create-stt.dto';
import { UserProvider } from '../user.provider';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';

@Injectable()
export class SttProvider {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  public async getAll() {
    return await SimpleTrackingTestsEntity.findAll();
  }

  public async getById(id: number) {
    return await SimpleTrackingTestsEntity.findOne({ where: { id: id } });
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await SimpleTrackingTestsEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateSttDto) {
    await this.userProvider.getUserById(data.userId);

    const test = await SimpleTrackingTestsEntity.create({
      userId: data.userId,
      allSignals: data.allSignals,
      successCount: data.successCount,
      avgTime: data.avgTime,
      timeDeviation: data.timeDeviation,
      valid: true,
    });
    return new BasicSuccessfulResponse(test);
  }
}
