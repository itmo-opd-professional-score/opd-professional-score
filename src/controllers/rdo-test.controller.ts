import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { RdoTestProvider } from '../providers/tests-providers/rdo-test.provider';
import { CreateRdoDto } from '../dto/test/create-rdo.dto';

@Controller('test/rdo')
export class RdoTestController {
  constructor(
    @Inject(RdoTestProvider) private rdoTestProvider: RdoTestProvider,
  ) {}

  @Get('getAll')
  public async getAll() {
    return await this.rdoTestProvider.getAll();
  }

  @Get('getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.rdoTestProvider.getById(id);
  }

  @Get('getByUserId/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    return await this.rdoTestProvider.getByUserId(userId);
  }

  @Post('createRDOTest')
  public async createSoundAddition(@Body() data: CreateRdoDto) {
    return await this.rdoTestProvider.createRDOTest(data);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    return await this.rdoTestProvider.delete(id);
  }
}
