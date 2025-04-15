import { Inject, Injectable } from '@nestjs/common';
import { CreateTestSetupDto } from '../../dto/test/setups/create-test-setup.dto';
import { TestTypesProvider } from '../test-types.provider';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { TestTypes } from '../../entities/test-types.entity';
import { TestTypeNotFoundException } from '../../exceptions/test/test-types/test-type-not-found.exception';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';
import { UpdateSetupDto } from '../../dto/test/setups/update-setup.dto';
import { TestSetupEntity } from '../../entities/test-setup.entity';

@Injectable()
export class TestSetupProvider {
  constructor(
    @Inject(TestTypesProvider)
    private testTypesProvider: TestTypesProvider,
  ) {}

  public async getAll() {
    return TestSetupEntity.findAll();
  }

  public async getAllByTestType(testType: string): Promise<TestSetupEntity[]> {
    const type = await TestTypes.findOne({ where: { name: testType } });
    if (type == null) throw new TestTypeNotFoundException(testType, 'name');

    return TestSetupEntity.findAll({ where: { testTypeId: type.id } });
  }

  public async getById(id: number) {
    return TestSetupEntity.findOne({
      where: { id: id },
    });
  }

  public async createSetup(data: CreateTestSetupDto) {
    const type = await TestTypes.findOne({ where: { name: data.testType } });
    if (type == null)
      throw new TestTypeNotFoundException(data.testType, 'name');

    const res = await TestSetupEntity.create({
      ...data,
      testTypeId: type.id,
    });

    return new BasicSuccessfulResponse(res);
  }

  public async updateSetup(data: UpdateSetupDto) {
    const setup = await this.getById(data.id);
    if (setup == null)
      throw new TestNotFoundException(data.id, 'id', 'Hard custom test');

    await TestSetupEntity.update(
      { ...data.updated },
      { where: { id: data.id } },
    );

    return new BasicSuccessfulResponse('Test setup updated successfully.');
  }

  public async deleteSetup(id: number) {
    const setup = await this.getById(id);
    if (setup == null)
      throw new TestNotFoundException(id, 'id', 'Hard custom test');

    await TestSetupEntity.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse('Test setup removed successfully');
  }
}
