import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';

config();
const sequelize = new Sequelize(
  'postgres',
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: 'postgres',
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
