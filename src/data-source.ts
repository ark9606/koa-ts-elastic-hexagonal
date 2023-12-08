import {DataSource} from "typeorm";
import {DATABASE} from "./config";

export default new DataSource({
  type: "postgres",
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USER,
  password: DATABASE.PASS,
  database: DATABASE.DB,
  synchronize: false,
  logging: true,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  // entities: [Post, Category],
  subscribers: [],
  migrations: ['./migrations/*.ts'],
});