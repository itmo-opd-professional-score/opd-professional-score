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
import { TestSetupProvider } from '../providers/tests-providers/test-setup.provider';
import { TestNotFoundException } from '../exceptions/test/test-not-found.exception';
import { CreateTestSetupDto } from '../dto/test/setups/create-test-setup.dto';
import { UpdateSetupDto } from '../dto/test/setups/update-setup.dto';

@Controller('/testSetup')
export class TestSetupController {
  constructor(
    @Inject(TestSetupProvider)
    private TestSetupEntityProvider: TestSetupProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.TestSetupEntityProvider.getAll();
  }

  @Get('/getAllSetupsByTestType/:testType')
  public async getByIdByTestType(@Param('testType') testType: string) {
    return await this.TestSetupEntityProvider.getAllByTestType(testType);
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    const setup = await this.TestSetupEntityProvider.getById(id);
    if (setup == null)
      throw new TestNotFoundException(id, 'id', 'Hard custom test');

    return setup;
  }

  @Post('/createSetup')
  public async createSetup(@Body() data: CreateTestSetupDto) {
    return await this.TestSetupEntityProvider.createSetup(data);
  }

  @Patch('/updateSetup')
  public async updateSetup(@Body() data: UpdateSetupDto) {
    return await this.TestSetupEntityProvider.updateSetup(data);
  }

  @Delete('/deleteSetup/:id')
  public async deleteSetup(@Param('id') id: number) {
    return await this.TestSetupEntityProvider.deleteSetup(id);
  }
}
