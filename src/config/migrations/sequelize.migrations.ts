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
    await sequelize.query(
      `ALTER TABLE "simple-light-test"
          ALTER COLUMN "averageCallbackTime" TYPE FLOAT;
      ALTER TABLE "simple-light-test"
          ALTER COLUMN "dispersion" TYPE FLOAT;
      ALTER TABLE "simple-light-test"
          ALTER COLUMN "userId" DROP NOT NULL;
      `,
    );

    await sequelize.query(
      `ALTER TABLE "hard-light-test"
          ALTER COLUMN "dispersion" TYPE FLOAT;
      ALTER TABLE "hard-light-test"
          ALTER COLUMN "averageCallbackTime" TYPE FLOAT;
      ALTER TABLE "hard-light-test"
          ALTER COLUMN "userId" DROP NOT NULL;`,
    );

    await sequelize.query(
      `ALTER TABLE "simple-sound-test"
          ALTER COLUMN "dispersion" TYPE FLOAT;
      ALTER TABLE "simple-sound-test"
          ALTER COLUMN "averageCallbackTime" TYPE FLOAT;
      ALTER TABLE "simple-sound-test"
          ALTER COLUMN "userId" DROP NOT NULL;

      `,
    );

    await sequelize.query(
      `ALTER TABLE "addition-test" ALTER COLUMN "dispersion" TYPE FLOAT;
      ALTER TABLE "addition-test" ALTER COLUMN "averageCallbackTime" TYPE FLOAT;
      ALTER TABLE "addition-test"
          ALTER COLUMN "userId" DROP NOT NULL;`,
    );
  }
}
