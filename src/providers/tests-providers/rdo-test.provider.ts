import { Inject, Injectable } from '@nestjs/common';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { UserProvider } from '../user.provider';
import { RdoTestEntity } from '../../entities/rdo-test.entity';
import { TestTypesProvider } from '../test-types.provider';
import { TestValidationStrategy } from '../../strategies/test-validation.strategy';
import { InvitationTestsProvider } from '../invitation-tests.provider';
import { CreateRdoDto } from '../../dto/test/create-rdo.dto';

@Injectable()
export class RdoTestProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(TestTypesProvider) private testTypesProvider: TestTypesProvider,
    @Inject(TestValidationStrategy)
    private testValidationStrategy: TestValidationStrategy,
    @Inject(InvitationTestsProvider) private itp: InvitationTestsProvider,
  ) {}

  public async getAll() {
    return await RdoTestEntity.findAll();
  }

  public async getById(id: number) {
    const res = await RdoTestEntity.findOne({ where: { id: id } });
    if (res == null) throw new TestNotFoundException(id, 'id', 'RDO test');

    return res;
  }

  public async getByUserId(userId: number) {
    await this.userProvider.getUserById(userId);
    return await RdoTestEntity.findAll({ where: { userId: userId } });
  }

  public async createRDOTest(data: CreateRdoDto) {
    let notUserId: boolean = false;
    let token: string | null = null;

    if (data.userId != null) {
      await this.userProvider.getUserById(data.userId);
    } else {
      notUserId = true;
    }

    const testType = await this.testTypesProvider.getTypeByName(data.testType);
    const test = await RdoTestEntity.create({
      ...data,
      testTypeId: testType?.id,
      valid: this.testValidationStrategy.validateAdditionTest(data),
    });

    if (notUserId)
      token = await this.itp.generateFeedbackToken<RdoTestEntity>(test);

    const res = {
      testToken: token,
    };

    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id).then(async () => {
      await RdoTestEntity.destroy({ where: { id: id } });
    });

    return new BasicSuccessfulResponse('Test deleted successfully');
  }
}
