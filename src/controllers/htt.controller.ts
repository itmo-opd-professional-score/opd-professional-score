import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { HttProvider } from '../providers/tests-providers/htt.provider';
import { CreateHttDto } from '../dto/test/create-htt.dto';

@Controller('/test/tracking/hard')
export class HttController {
  constructor(@Inject(HttProvider) private httProvider: HttProvider) {}

  @Get('/getAll')
  public async getAll() {
    return await this.httProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.httProvider.getById(id);
  }

  @Get('/getByUserId/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    return await this.httProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() data: CreateHttDto) {
    return await this.httProvider.create(data);
  }
}
