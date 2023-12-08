import {DataSource} from "typeorm";
import {DATABASE} from "../env";

export default new DataSource({
  type: "postgres",
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USER,
  password: DATABASE.PASS,
  database: DATABASE.DB,
  synchronize: false,
  logging: true,
  entities: ['./**/*.entity.{ts,js}'],
  subscribers: [],
  migrations: ['./migrations/*.ts'],
});