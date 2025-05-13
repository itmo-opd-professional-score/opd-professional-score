import { Inject, Injectable } from '@nestjs/common';
import { TestBatteriesEntity } from '../../entities/test-batteries.entity';
import { TestInTestBatteryEntity } from '../../entities/test-in-test-battery.entity';
import { TestBatteryNotFoundException } from '../../exceptions/test/test-battery/test-battery-not-found.exception';
import { CreateTestBatteryDto } from '../../dto/test/test-battery/create-test-battery.dto';
import { TestInTestBatteryProvider } from './test-in-test-battery.provider';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { UpdateTestBatteryDto } from '../../dto/test/test-battery/update-test-battery.dto';
import { TestSetupEntity } from '../../entities/test-setup.entity';
import { TestNotFoundException } from '../../exceptions/test/test-not-found.exception';

@Injectable()
export class TestBatteryProvider {
  constructor(
    @Inject(TestInTestBatteryProvider)
    private titbProvider: TestInTestBatteryProvider,
  ) {}

  public async getAll() {
    return await TestBatteriesEntity.findAll({
      include: TestInTestBatteryEntity,
    });
  }

  public async getById(id: number) {
    const res = await TestBatteriesEntity.findOne({
      where: { id: id },
      include: TestInTestBatteryEntity,
    });
    if (res == null) throw new TestBatteryNotFoundException(id, 'id');

    return res;
  }

  public async create(data: CreateTestBatteryDto) {
    await Promise.all(
      data.tests.map(async (test) => {
        if (test.setupId != null) {
          const setup = await TestSetupEntity.findOne({
            where: { id: test.setupId },
          });
          if (setup == null)
            throw new TestNotFoundException(test.setupId, 'id', 'Test setup');
        }
      }),
    );

    const testBattery = await TestBatteriesEntity.create({
      name: data.name,
      description: data.description,
    });

    await Promise.all(
      data.tests.map(async (test) => {
        await this.titbProvider.create(test, testBattery.id);
      }),
    );

    const res = await this.getById(testBattery.id);
    return new BasicSuccessfulResponse(res);
  }

  public async update(data: UpdateTestBatteryDto) {
    const testBattery = await this.getById(data.testBatteryId);
    const updatedData = data.updatedData;

    await Promise.all(
      updatedData.tests.map(async (test) => {
        if (test.setupId != null) {
          const setup = await TestSetupEntity.findOne({
            where: { id: test.setupId },
          });
          if (setup == null)
            throw new TestNotFoundException(test.setupId, 'id', 'Test setup');
        }
      }),
    );

    await this.titbProvider.deleteAllById(data.testBatteryId);

    await TestBatteriesEntity.update(
      {
        name: updatedData.name == null ? testBattery.name : updatedData.name,
        description:
          updatedData.description == null
            ? testBattery.description
            : updatedData.description,
      },
      { where: { id: data.testBatteryId } },
    );

    await Promise.all(
      updatedData.tests.map(async (test) => {
        await this.titbProvider.create(test, testBattery.id);
      }),
    );

    const res = await this.getById(testBattery.id);
    return new BasicSuccessfulResponse(res);
  }

  public async delete(id: number) {
    await this.getById(id);
    await this.titbProvider.getAllById(id);
    await TestBatteriesEntity.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse('Test battery removed successfully.');
  }
}
