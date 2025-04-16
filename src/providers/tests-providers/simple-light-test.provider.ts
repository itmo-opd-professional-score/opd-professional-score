import { Inject, Injectable } from '@nestjs/common';
import { SimpleLightTestEntity } from '../../entities/simple-light-test.entity';
import { CreateSltDto } from '../../dto/test/create-slt.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { SltNotFoundException } from '../../exceptions/test/slt-not-found.exception';
import { UserProvider } from '../user.provider';
import { TestTypesProvider } from '../test-types.provider';
import { TestValidationStrategy } from '../../strategies/test-validation.strategy';
import { InvitationTestsProvider } from '../invitation-tests.provider';

@Injectable()
export class SimpleLightTestProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(InvitationTestsProvider) private itp: InvitationTestsProvider,
    @Inject(TestValidationStrategy)
    private testValidationStrategy: TestValidationStrategy,
  ) {}

  public async getAll() {
    return await SimpleLightTestEntity.findAll();
  }

  public async getById(id: number) {
    const test = await SimpleLightTestEntity.findOne({ where: { id: id } });
    if (test == null) throw new SltNotFoundException(id, 'id');

    return test;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await SimpleLightTestEntity.findAll({
      where: { userId: userId },
    });
  }

  public async create(data: CreateSltDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType = await this.testTypesProvider.getTypeByName('SIMPLE_LIGHT');
    const test = await SimpleLightTestEntity.create({
      testTypeId: testType?.id,
      ...data,
      valid: await this.testValidationStrategy.validateSimpleTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<SimpleLightTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id).then(async () => {
      await SimpleLightTestEntity.destroy({ where: { id: id } });
    });

    return new BasicSuccessfulResponse('Test deleted successfully');
  }
}
