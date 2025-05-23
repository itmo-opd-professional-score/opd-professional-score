import { Inject, Injectable } from '@nestjs/common';
import { UserProvider } from '../user.provider';
import { TestTypesProvider } from '../test-types.provider';
import { TestValidationStrategy } from '../../strategies/test-validation.strategy';
import { AdditionTestEntity } from '../../entities/addition-test.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { CreateAtDto } from '../../dto/test/create-at.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { InvitationTestsProvider } from '../invitation-tests.provider';

@Injectable()
export class AdditionTestProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(InvitationTestsProvider) private itp: InvitationTestsProvider,
    @Inject(TestValidationStrategy)
    private testValidationStrategy: TestValidationStrategy,
  ) {}

  public async getAll() {
    return await AdditionTestEntity.findAll();
  }

  public async getById(id: number) {
    const res = await AdditionTestEntity.findOne({ where: { id: id } });
    if (res == null)
      throw new TestNotFoundException(id, 'id', 'Additions test');

    return res;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await AdditionTestEntity.findAll({ where: { userId: userId } });
  }

  public async createVisualAddition(data: CreateAtDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType =
      await this.testTypesProvider.getTypeByName('ADDITION_VISUAL');
    const test = await AdditionTestEntity.create({
      ...data,
      testTypeId: testType?.id,
      valid: await this.testValidationStrategy.validateAdditionTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<AdditionTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async createSoundAddition(data: CreateAtDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType =
      await this.testTypesProvider.getTypeByName('ADDITION_SOUND');
    const test = await AdditionTestEntity.create({
      ...data,
      testTypeId: testType?.id,
      valid: await this.testValidationStrategy.validateAdditionTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<AdditionTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id).then(async () => {
      await AdditionTestEntity.destroy({ where: { id: id } });
    });

    return new BasicSuccessfulResponse('Test deleted successfully');
  }
}
