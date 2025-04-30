import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SttProvider } from '../providers/tests-providers/stt.provider';
import { CreateSttDto } from '../dto/test/create-stt.dto';

@Controller('/test/tracking/simple')
export class SttController {
  constructor(@Inject(SttProvider) private sttProvider: SttProvider) {}

  @Get('/getAll')
  public async getAll() {
    return await this.sttProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return await this.sttProvider.getById(id);
  }

  @Get('/getByUserId/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    return await this.sttProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() createSttDto: CreateSttDto) {
    return await this.sttProvider.create(createSttDto);
  }
}
