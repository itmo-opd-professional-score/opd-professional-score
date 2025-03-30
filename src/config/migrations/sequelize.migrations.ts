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
    await sequelize.query(`DROP TABLE "test_blocks" CASCADE;`);
    await sequelize.query(`DROP TABLE "test_to_test_block" CASCADE;`);
    await sequelize.query(`DROP TABLE "tests" CASCADE;`);
    await sequelize.query(`DROP TABLE "sections" CASCADE;`);
    await sequelize.query(`-- DROP TABLE "test_to_user_dashboard" CASCADE;`);
  }
}
