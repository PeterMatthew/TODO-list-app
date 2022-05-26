import { Sequelize } from 'sequelize-typescript'
import { Task } from '../models/Task';

const sequelize = new Sequelize({
  database: 'database_development',
  dialect: 'sqlite',
  storage: './src/database/db',
  models: [__dirname + '../models']
})

async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

sequelize.addModels([Task]);
