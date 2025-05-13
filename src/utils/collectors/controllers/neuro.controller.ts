import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FinalCollectorUtil } from '../final-collector.util';

@Controller('/neuro')
export class NeuroController {
  constructor(
    @Inject(FinalCollectorUtil) private collector: FinalCollectorUtil,
  ) {}

  @Get('/collect/:userId')
  public async collect(@Param('userId') userId: number) {
    return await this.collector.collectData(userId);
  }
}
