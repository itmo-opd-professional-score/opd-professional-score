import { Inject, Injectable } from '@nestjs/common';
import { CognitiveTestsEntity } from '../../entities/cognitive-tests.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { TestTypesProvider } from '../test-types.provider';
import { CreateCognitiveDto } from '../../dto/test/create-cognitive.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { User } from '../../entities/user.entity';
import { UserNotFoundException } from '../../exceptions/users/user-not-found.exception';

@Injectable()
export class CognitiveTestProvider {
  constructor(
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
  ) {}

  public async getAll() {
    return await CognitiveTestsEntity.findAll();
  }

  public async getById(id: number) {
    const test = await CognitiveTestsEntity.findOne({ where: { id: id } });
    if (test == null)
      throw new TestNotFoundException(id, 'id', 'Cognitive test');

    return test;
  }

  public async getByUserId(userId: number) {
    const user = await User.findOne({ where: { id: userId } });
    if (user == null) throw new UserNotFoundException(userId, `id`);

    return await CognitiveTestsEntity.findAll({ where: { userId: userId } });
  }

  public async create(data: CreateCognitiveDto) {
    const testType = await this.testTypesProvider.getTypeByName(data.testType);

    const res = await CognitiveTestsEntity.create({
      userId: data.userId,
      allSignals: data.allSignals,
      score: data.score,
      mistakes: data.mistakes,
      testTypeId: testType?.id,
      valid: true,
    });

    return new BasicSuccessfulResponse(res);
  }
}
