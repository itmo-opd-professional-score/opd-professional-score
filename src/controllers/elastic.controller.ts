import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ElasticUtil } from '../utils/elastic/elastic.util';

@Controller('/elastic')
export class ElasticController {
  constructor(@Inject(ElasticUtil) private elasticUtil: ElasticUtil) {}

  @Get('/getAllDocumentsByTopic/:index')
  public async getAllDocumentsByTopic(@Param('index') index: string) {
    return await this.elasticUtil.getAllDocumentsByTopic(index);
  }

  @Get('/getAllDocuments')
  public async getAllDocuments() {
    return await this.elasticUtil.getAllDocuments();
  }
}
