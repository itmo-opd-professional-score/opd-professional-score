import { TestBlockProvider } from '../providers/test-block.provider';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTestBlockDto } from '../dto/test/test-blocks/create-test-block.dto';
import { AssignUsersToTestBlockDto } from '../dto/test/test-blocks/assign-users-to-test-block.dto';
import { CreateTestBlockLinkJwtDto } from '../dto/jwt/create-test-block-link-jwt.dto';

@Controller('/testBlock')
export class TestBlockController {
  constructor(
    @Inject(TestBlockProvider) private testBlockProvider: TestBlockProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return await this.testBlockProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.testBlockProvider.getById(id);
  }

  @Get('/getUsersByTBId/:id')
  public async getAllUsersByToken(@Param('id') id: number) {
    return await this.testBlockProvider.getAllUsersByTokenId(id);
  }

  @Get('/getByUserId/:id')
  public async getByUserId(@Param('id') id: number) {
    return await this.testBlockProvider.getByUserId(id);
  }

  @Post('/create')
  public async create(@Body() data: CreateTestBlockDto) {
    return await this.testBlockProvider.createTestBlock(data);
  }

  @Post('/assignUsers')
  public async assignUsers(@Body() data: AssignUsersToTestBlockDto) {
    return await this.testBlockProvider.assignTestBlockToUsers(data);
  }

  @Post('/createTestBlockLink')
  public createTestBlockLink(@Body() data: CreateTestBlockLinkJwtDto) {
    return this.testBlockProvider.createTestBlockLink(data);
  }

  @Delete('delete/:id')
  public async remove(@Param('id') id: number) {
    return await this.testBlockProvider.delete(id);
  }
}
