import { Sequelize, Transaction } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    // logging: console.log,
    logging: false,
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    
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
  sequelize,
  testDbConnection
};