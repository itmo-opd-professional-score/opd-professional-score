import { Module } from '@nestjs/common';
import { ElasticController } from '../controllers/elastic.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticUtil } from '../utils/elastic/elastic.util';
import { ElasticGateway } from '../utils/elastic/elastic.gateway';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTIC_HOST') as string,
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME') as string,
          password: configService.get('ELASTICSEARCH_PASSWORD') as string,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticUtil, ElasticGateway],
  controllers: [ElasticController],
  exports: [ElasticUtil],
})
export class ElasticModule {}
