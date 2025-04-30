import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestBlocksProvider } from '../providers/test-blocks.provider';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { AssignUsersDto } from '../dto/test/test-blocks/assign-users.dto';
import { UpdateTestBlockDto } from '../dto/test/test-blocks/update-test-block.dto';

@Controller('/testBlock')
export class TestBlocksController {
  constructor(
    @Inject(TestBlocksProvider) private testBlocksProvider: TestBlocksProvider,
  ) {}

  @Get('/getAllTestBlocks')
  public async getAllTestBlocks() {
    return await this.testBlocksProvider.getAllTestBlocks();
  }

  @Get('/getTestBlockById/:id')
  public async getTestBlockById(@Param('id') id: number) {
    return await this.testBlocksProvider.getTestBlockById(id);
  }

  @Get('/getTestBlockByToken/:token')
  public async getTestBlockByToken(@Param('token') token: string) {
    return await this.testBlocksProvider.getTestBlockByToken(token);
  }

  @Get('/getAllAssignedTestBlocks')
  public async getAllAssignedTestBlocks() {
    return await this.testBlocksProvider.getAllAssignedTestBlocks();
  }

  @Get('/getAllAssignedTestBlockByUserId/:userId')
  public async getAllAssignedTestBlockByUserId(
    @Param('userId') userId: number,
  ) {
    return await this.testBlocksProvider.getAllAssignedTestBlockByUserId(
      userId,
    );
  }

  @Post('/createTestBlock')
  public async createTestBlock(@Body() data: CreateTestBlockDto) {
    return await this.testBlocksProvider.createTestBlock(data);
  }

  @Post('/assignUsers')
  public async assignUsers(data: AssignUsersDto) {
    return await this.testBlocksProvider.assignUsers(data);
  }

  @Patch('/updateTestBlock')
  public async updateTestBlock(@Body() data: UpdateTestBlockDto) {
    return await this.testBlocksProvider.updateTestBlock(data);
  }
}
