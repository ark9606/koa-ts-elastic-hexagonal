import {DataSource} from "typeorm";
import {DATABASE} from "../env.js";

export default new DataSource({
  type: "postgres",
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USER,
  password: DATABASE.PASS,
  database: DATABASE.DB,
  synchronize: false,
  logging: false,
  // todo play here, js for prod, ts for dev
  entities: ['./**/*.entity.{js}'],
  subscribers: [],
  // todo play here, js for prod, ts for dev
  migrations: ['./migrations/*.js'],
});