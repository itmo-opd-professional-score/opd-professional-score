import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BasicHttpExceptionFilter } from './filters/basic-http-exception.filter';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  const sequelize = new Sequelize(
    'postgres',
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );

  async function updateTable() {
    await sequelize.query(
      'ALTER TABLE professions ALTER COLUMN requirements TYPE TEXT;',
    );
    await sequelize.query(
      'ALTER TABLE professions ALTER COLUMN description TYPE TEXT;',
    );
  }

  updateTable()
    .then(() => {
      console.log('Таблица обновлена');
    })
    .catch((error) => {
      console.error('Ошибка при обновлении таблицы:', error);
    });

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
