import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BasicHttpExceptionFilter } from './filters/basic-http-exception.filter';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import { config } from 'dotenv';
import { SequelizeMigrations } from './config/migrations/sequelize.migrations';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seq = new SequelizeMigrations();
  await seq.updateUserTable();

  app.useGlobalFilters(
    new BasicHttpExceptionFilter(),
    new ValidationErrorFilter(),
  );
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
