import * as dotenv from 'dotenv';
dotenv.config();

export const DATABASE = {
  PORT: +process.env.PG_PORT,
  USER: process.env.PG_USER,
  PASS: process.env.PG_PASSWORD,
  DB: process.env.PG_DATABASE,
  HOST: process.env.PG_HOST,
};
