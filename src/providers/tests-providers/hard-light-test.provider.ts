import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../user.provider';
import { TestTypesProvider } from '../test-types.provider';
import { HardLightTestEntity } from '../../entities/hard-light-test.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { TestValidationStrategy } from '../../strategies/test-validation.strategy';
import { CreateHltDto } from '../../dto/test/create-hlt.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { InvitationTestsProvider } from '../invitation-tests.provider';

@Injectable()
export class HardLightTestProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(InvitationTestsProvider) private itp: InvitationTestsProvider,
    @Inject(TestValidationStrategy)
    private testValidationStrategy: TestValidationStrategy,
  ) {}

  public async getAll() {
    return await HardLightTestEntity.findAll();
  }

  public async getById(id: number) {
    const test = await HardLightTestEntity.findOne({ where: { id: id } });
    if (test == null)
      throw new TestNotFoundException(id, 'id', 'Hard light test');

    return test;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await HardLightTestEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateHltDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType = await this.testTypesProvider.getTypeByName('HARD_LIGHT');
    const test = await HardLightTestEntity.create({
      ...data,
      testTypeId: testType?.id,
      valid: await this.testValidationStrategy.validateHardLightTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<HardLightTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id).then(async () => {
      await HardLightTestEntity.destroy({ where: { id: id } });
    });

    return new BasicSuccessfulResponse('Test deleted successfully');
  }
}
