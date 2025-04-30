import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CognitiveTestProvider } from '../providers/tests-providers/cognitive-test.provider';
import { CreateCognitiveDto } from '../dto/test/create-cognitive.dto';

@Controller('/cognitive')
export class CognitiveController {
  constructor(
    @Inject(CognitiveTestProvider)
    private cognitiveTestProvider: CognitiveTestProvider,
  ) {}

  @Get('/getAll')
  public async getAll() {
    return this.cognitiveTestProvider.getAll();
  }

  @Get('/getById/:id')
  public async getById(@Param('id') id: number) {
    return this.cognitiveTestProvider.getById(id);
  }

  @Get('/getByUserId/:id')
  public async getByUserId(@Param('userId') userId: number) {
    return this.cognitiveTestProvider.getByUserId(userId);
  }

  @Post('/create')
  public async create(@Body() body: CreateCognitiveDto) {
    return this.cognitiveTestProvider.create(body);
  }
}
