import { Inject, Injectable } from '@nestjs/common';
import { SimpleSoundTestEntity } from '../../entities/simple-sound-test.entity';
import { UserProvider } from '../user.provider';
import { TestTypesProvider } from '../test-types.provider';
import { TestValidationStrategy } from '../../strategies/test-validation.strategy';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { CreateSstDto } from '../../dto/test/create-sst.dto';
import { InvitationTestsProvider } from '../invitation-tests.provider';

@Injectable()
export class SimpleSoundTestProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(InvitationTestsProvider) private itp: InvitationTestsProvider,
    @Inject(TestValidationStrategy)
    private testValidationStrategy: TestValidationStrategy,
  ) {}

  public async getAll() {
    return await SimpleSoundTestEntity.findAll();
  }

  public async getById(id: number) {
    const test = await SimpleSoundTestEntity.findOne({ where: { id: id } });
    if (test == null)
      throw new TestNotFoundException(id, 'id', 'Simple sound test');

    return test;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await SimpleSoundTestEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateSstDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType = await this.testTypesProvider.getTypeByName('SIMPLE_SOUND');
    const test = await SimpleSoundTestEntity.create({
      testTypeId: testType?.id,
      ...data,
      valid: await this.testValidationStrategy.validateSimpleTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<SimpleSoundTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id).then(async () => {
      await SimpleSoundTestEntity.destroy({ where: { id: id } });
    });

    return new BasicSuccessfulResponse('Test deleted successfully');
  }
}
