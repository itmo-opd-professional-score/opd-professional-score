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

export class SequelizeMigrations {
  public async updateUserTable() {
    await sequelize.query(`CREATE TYPE gender AS ENUM ('MALE', 'FEMALE');`);

    await sequelize.query(
      `ALTER TABLE "user" ADD COLUMN age INTEGER CHECK (age > 0);`,
    );

    await sequelize.query('ALTER TABLE "user" ADD COLUMN gender gender;');
  }
}
