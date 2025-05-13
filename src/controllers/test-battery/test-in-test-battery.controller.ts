import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { TestInTestBatteryProvider } from '../../providers/test-battery/test-in-test-battery.provider';
import { CreateTestInTestBatteryDto } from '../../dto/test/test-battery/create-test-in-test-battery.dto';

@Controller('/test-in-test-battery')
export class TestInTestBatteryController {
  constructor(
    @Inject(TestInTestBatteryProvider)
    private testBatteryProvider: TestInTestBatteryProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testBatteryProvider.getAll();
  }

  @Get('/getAllByTestBatteryId/:testBatteryId')
  public async getAllByTestBatteryId(
    @Param('testBatteryId') testBatteryId: number,
  ) {
    return await this.testBatteryProvider.getAllById(testBatteryId);
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.testBatteryProvider.getById(id);
  }

  @Post('/create')
  public async create(
    @Body() body: { data: CreateTestInTestBatteryDto; testBatteryId: number },
  ) {
    return await this.testBatteryProvider.create(body.data, body.testBatteryId);
  }

  @Delete('/delete/:id')
  public async deleteById(@Param('id') id: number) {
    return await this.testBatteryProvider.deleteById(id);
  }

  @Delete('/deleteAllById/:id')
  public async deleteAllById(@Param('id') id: number) {
    return await this.testBatteryProvider.deleteAllById(id);
  }
}
