import { Sequelize, Transaction } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    logging: console.log
  });


const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to postgres has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export {
  sequelize as sq,
  testDbConnection
};