import { Injectable } from '@nestjs/common';
import { TestInTestBatteryEntity } from '../../entities/test-in-test-battery.entity';
import { TestInTestBatteryNotFoundException } from '../../exceptions/test/test-battery/test-in-test-battery-not-found.exception';
import { CreateTestInTestBatteryDto } from '../../dto/test/test-battery/create-test-in-test-battery.dto';
import { BasicSuccessfulResponse } from '../../IO/basic-successful-response';
import { TestBatteryNotFoundException } from '../../exceptions/test/test-battery/test-battery-not-found.exception';
import { TestBatteriesEntity } from '../../entities/test-batteries.entity';

@Injectable()
export class TestInTestBatteryProvider {
  public async getAll() {
    return await TestInTestBatteryEntity.findAll();
  }

  public async getAllById(testBatteryId: number) {
    const testBattery = await TestBatteriesEntity.findOne({
      where: { id: testBatteryId },
    });
    if (testBattery == null)
      throw new TestBatteryNotFoundException(testBatteryId, 'id');

    return await TestInTestBatteryEntity.findAll({
      where: { testBatteryId: testBatteryId },
    });
  }

  public async getById(id: number) {
    const res = await TestInTestBatteryEntity.findOne({ where: { id: id } });
    if (res == null) throw new TestInTestBatteryNotFoundException(id, 'id');

    return res;
  }

  public async create(data: CreateTestInTestBatteryDto, testBatteryId: number) {
    const battery = await TestInTestBatteryEntity.findOne({
      where: { id: testBatteryId },
    });

    if (battery == null)
      throw new TestBatteryNotFoundException(testBatteryId, 'id');

    const res = await TestInTestBatteryEntity.create({
      name: data.name,
      setupId: data.setupId,
      testBatteryId: testBatteryId,
    });

    return new BasicSuccessfulResponse(res);
  }

  public async deleteById(id: number) {
    await this.getById(id);
    await TestInTestBatteryEntity.destroy({ where: { id: id } });

    return new BasicSuccessfulResponse(
      'Test from test battery removed successfully.',
    );
  }

  public async deleteAllById(testBatteryId: number) {
    const battery = await TestInTestBatteryEntity.findOne({
      where: { id: testBatteryId },
    });

    if (battery == null)
      throw new TestBatteryNotFoundException(testBatteryId, 'id');

    const tests = await this.getAllById(testBatteryId);
    for (const test of tests) await this.deleteById(test.id);

    return new BasicSuccessfulResponse('All tests removed successfully.');
  }
}
