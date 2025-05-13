import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestBatteryProvider } from '../../providers/test-battery/test-battery.provider';
import { CreateTestBatteryDto } from '../../dto/test/test-battery/create-test-battery.dto';
import { UpdateTestBatteryDto } from '../../dto/test/test-battery/update-test-battery.dto';

@Controller('/testBattery')
export class TestBatteryController {
  constructor(
    @Inject(TestBatteryProvider)
    private testBatteryProvider: TestBatteryProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testBatteryProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.testBatteryProvider.getById(id);
  }

  @Post('/create')
  public async create(@Body() createTestBatteryDto: CreateTestBatteryDto) {
    return await this.testBatteryProvider.create(createTestBatteryDto);
  }

  @Patch('/update')
  public async update(@Body() data: UpdateTestBatteryDto) {
    return await this.testBatteryProvider.update(data);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.testBatteryProvider.delete(id);
  }
}
